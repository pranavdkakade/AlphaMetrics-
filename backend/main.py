import os
import sys
import uuid
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, File, Form, HTTPException, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, Field
from sqlalchemy import JSON, DateTime, Float, ForeignKey, Integer, String, Text, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, relationship, sessionmaker

try:
    from sqlalchemy.dialects.postgresql import JSONB
except Exception:
    JSONB = None

ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.append(str(ROOT_DIR))

from ml_module.embedding_extractor import extract_embedding_from_file
from ml_module.similarity_search import find_best_matches

load_dotenv(ROOT_DIR / ".env")

app = FastAPI(title="AlphaMetrics Retail Intelligence API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./alphametrics.db",
)
SECRET_KEY = os.getenv("SECRET_KEY", "replace-this-with-env-secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "120"))
UPLOADS_DIR = Path(__file__).resolve().parent / "uploads"
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

is_sqlite = DATABASE_URL.startswith("sqlite")
engine_kwargs: dict[str, Any] = {"future": True}
if is_sqlite:
    engine_kwargs["connect_args"] = {"check_same_thread": False}

engine = create_engine(DATABASE_URL, **engine_kwargs)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
bearer_scheme = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
embedding_column_type = JSONB if DATABASE_URL.startswith("postgresql") and JSONB is not None else JSON

# ==== DATABASE INITIALIZATION ====
# Auto-create all tables on backend startup
def init_db():
    """Create all database tables on application startup."""
    Base.metadata.create_all(bind=engine)

@app.on_event("startup")
def startup_event():
    """Initialize database when FastAPI app starts."""
    init_db()
    print("✓ Database tables initialized successfully")


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    occupation: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False
    )

    products: Mapped[list["Product"]] = relationship(back_populates="owner")
    sales: Mapped[list["Sale"]] = relationship(back_populates="owner")


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    name: Mapped[str] = mapped_column(String(180), nullable=False)
    category: Mapped[str] = mapped_column(String(120), nullable=False)
    buying_price: Mapped[float] = mapped_column(Float, nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    image_path: Mapped[str | None] = mapped_column(Text, nullable=True)
    embedding: Mapped[dict[str, Any] | None] = mapped_column(embedding_column_type, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False
    )

    owner: Mapped[User] = relationship(back_populates="products")
    sales: Mapped[list["Sale"]] = relationship(back_populates="product")


class Sale(Base):
    __tablename__ = "sales"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id", ondelete="RESTRICT"), index=True)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    buying_price: Mapped[float] = mapped_column(Float, nullable=False)
    selling_price: Mapped[float] = mapped_column(Float, nullable=False)
    revenue: Mapped[float] = mapped_column(Float, nullable=False)
    profit: Mapped[float] = mapped_column(Float, nullable=False)
    similarity_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False
    )

    owner: Mapped[User] = relationship(back_populates="sales")
    product: Mapped[Product] = relationship(back_populates="sales")


class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    occupation: str = Field(min_length=2, max_length=120)
    email: str = Field(min_length=4, max_length=255)
    password: str = Field(min_length=6, max_length=128)


class LoginRequest(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class RecordSaleRequest(BaseModel):
    product_id: int
    quantity: int = Field(gt=0)
    selling_price: float = Field(gt=0)
    similarity_score: float | None = None


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)


def create_access_token(user_id: int, expires_delta: timedelta | None = None) -> str:
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    payload = {"sub": str(user_id), "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    token = credentials.credentials
    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        raw_sub = payload.get("sub")
        if raw_sub is None:
            raise credentials_error
        user_id = int(raw_sub)
    except (JWTError, ValueError) as exc:
        raise credentials_error from exc

    user = db.get(User, user_id)
    if not user:
        raise credentials_error
    return user


def save_upload_file(user_id: int, upload: UploadFile) -> Path:
    suffix = Path(upload.filename or "image.jpg").suffix.lower() or ".jpg"
    if suffix not in {".jpg", ".jpeg", ".png", ".webp"}:
        raise HTTPException(status_code=400, detail="Unsupported image format")

    user_dir = UPLOADS_DIR / str(user_id)
    user_dir.mkdir(parents=True, exist_ok=True)
    file_path = user_dir / f"{uuid.uuid4().hex}{suffix}"

    with file_path.open("wb") as buffer:
        buffer.write(upload.file.read())
    return file_path


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "AlphaMetrics backend running"}


@app.post("/auth/register")
def register(payload: RegisterRequest, db: Session = Depends(get_db)) -> dict[str, Any]:
    email = payload.email.strip().lower()
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise HTTPException(status_code=409, detail="Email already registered")

    user = User(
        name=payload.name.strip(),
        occupation=payload.occupation.strip(),
        email=email,
        password_hash=hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {
        "message": "Registered successfully",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.name,
            "occupation": user.occupation,
        },
    }


@app.post("/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> dict[str, str]:
    email = payload.email.strip().lower()
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = create_access_token(user_id=user.id)
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/auth/verify")
def verify_token(current_user: User = Depends(get_current_user)) -> dict[str, Any]:
    return {
        "authenticated": True,
        "user": {
            "id": current_user.id,
            "email": current_user.email,
            "full_name": current_user.name,
            "occupation": current_user.occupation,
        },
    }


@app.post("/products")
def create_product(
    name: str = Form(...),
    category: str = Form(...),
    buying_price: float = Form(...),
    quantity: int = Form(...),
    image: UploadFile | None = File(default=None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict[str, Any]:
    if buying_price <= 0:
        raise HTTPException(status_code=400, detail="Buying price must be positive")
    if quantity <= 0:
        raise HTTPException(status_code=400, detail="Quantity must be positive")

    image_path = None
    embedding_payload = None
    if image is not None:
        saved_path = save_upload_file(current_user.id, image)
        image_path = str(saved_path)
        vector = extract_embedding_from_file(saved_path)
        embedding_payload = {"values": vector}

    product = Product(
        user_id=current_user.id,
        name=name.strip(),
        category=category.strip(),
        buying_price=buying_price,
        quantity=quantity,
        image_path=image_path,
        embedding=embedding_payload,
    )
    db.add(product)
    db.commit()
    db.refresh(product)

    return {
        "message": "Product created",
        "product": {
            "id": product.id,
            "name": product.name,
            "category": product.category,
            "buying_price": product.buying_price,
            "quantity": product.quantity,
            "has_embedding": bool(product.embedding),
        },
    }


@app.get("/products")
def list_products(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[dict[str, Any]]:
    products = (
        db.query(Product)
        .filter(Product.user_id == current_user.id)
        .order_by(Product.created_at.desc())
        .all()
    )

    return [
        {
            "id": p.id,
            "name": p.name,
            "category": p.category,
            "buying_price": p.buying_price,
            "quantity": p.quantity,
            "image_path": p.image_path,
            "created_at": p.created_at.isoformat(),
            "has_embedding": bool(p.embedding and p.embedding.get("values")),
        }
        for p in products
    ]


@app.post("/sales/match-image")
def match_product_from_image(
    image: UploadFile = File(...),
    top_k: int = Form(default=3),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict[str, Any]:
    if top_k < 1 or top_k > 10:
        raise HTTPException(status_code=400, detail="top_k must be between 1 and 10")

    user_products = db.query(Product).filter(Product.user_id == current_user.id).all()
    candidates: list[dict[str, Any]] = []
    for product in user_products:
        if not product.embedding or not product.embedding.get("values"):
            continue
        candidates.append(
            {
                "id": product.id,
                "name": product.name,
                "buying_price": product.buying_price,
                "quantity": product.quantity,
                "embedding": product.embedding["values"],
            }
        )

    if not candidates:
        raise HTTPException(
            status_code=404,
            detail="No products with embeddings found for this user",
        )

    saved_query = save_upload_file(current_user.id, image)
    query_embedding = extract_embedding_from_file(saved_query)
    matches = find_best_matches(query_embedding, candidates, top_k=top_k)
    if not matches:
        raise HTTPException(status_code=404, detail="No matching product found")

    best = matches[0]
    return {
        "best_match": best,
        "top_matches": matches,
        "query_image_path": str(saved_query),
    }


@app.post("/sales/record")
def record_sale(
    payload: RecordSaleRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict[str, Any]:
    product = (
        db.query(Product)
        .filter(Product.id == payload.product_id, Product.user_id == current_user.id)
        .first()
    )
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if payload.quantity > product.quantity:
        raise HTTPException(status_code=400, detail="Insufficient stock")

    revenue = payload.selling_price * payload.quantity
    profit = (payload.selling_price - product.buying_price) * payload.quantity

    sale = Sale(
        user_id=current_user.id,
        product_id=product.id,
        quantity=payload.quantity,
        buying_price=product.buying_price,
        selling_price=payload.selling_price,
        revenue=revenue,
        profit=profit,
        similarity_score=payload.similarity_score,
    )
    product.quantity -= payload.quantity

    db.add(sale)
    db.commit()
    db.refresh(sale)

    return {
        "message": "Sale recorded",
        "sale": {
            "id": sale.id,
            "product_id": sale.product_id,
            "quantity": sale.quantity,
            "revenue": sale.revenue,
            "profit": sale.profit,
            "created_at": sale.created_at.isoformat(),
        },
    }


@app.get("/sales/history")
def sales_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[dict[str, Any]]:
    sales = (
        db.query(Sale)
        .filter(Sale.user_id == current_user.id)
        .order_by(Sale.created_at.desc())
        .all()
    )

    return [
        {
            "id": s.id,
            "product_id": s.product_id,
            "product_name": s.product.name,
            "quantity": s.quantity,
            "buying_price": s.buying_price,
            "selling_price": s.selling_price,
            "revenue": s.revenue,
            "profit": s.profit,
            "similarity_score": s.similarity_score,
            "sold_at": s.created_at.isoformat(),
        }
        for s in sales
    ]


@app.get("/analytics/summary")
def analytics_summary(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict[str, Any]:
    products = db.query(Product).filter(Product.user_id == current_user.id).all()
    sales = db.query(Sale).filter(Sale.user_id == current_user.id).all()

    total_revenue = sum(item.revenue for item in sales)
    total_profit = sum(item.profit for item in sales)
    total_stock = sum(item.quantity for item in products)
    total_sales = len(sales)
    margin = (total_profit / total_revenue * 100.0) if total_revenue > 0 else 0.0

    return {
        "total_revenue": total_revenue,
        "total_profit": total_profit,
        "gross_profit_margin_percent": round(margin, 2),
        "active_products": len(products),
        "remaining_stock_units": total_stock,
        "sales_transactions": total_sales,
    }
