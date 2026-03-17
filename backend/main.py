from datetime import datetime, timedelta, timezone
import hashlib
import hmac
import json
from pathlib import Path

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from pydantic import BaseModel

app = FastAPI(title="AlphaMetrics Auth API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = "replace-this-with-env-secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
bearer_scheme = HTTPBearer()
USERS_FILE = Path(__file__).resolve().parent / "users.json"


class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    name: str
    occupation: str
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def verify_password(password: str, hashed_password: str) -> bool:
    computed = hash_password(password)
    return hmac.compare_digest(computed, hashed_password)


def _default_users() -> dict:
    return {
        "admin@alphametrics.com": {
            "email": "admin@alphametrics.com",
            "full_name": "Alpha Admin",
            "occupation": "Admin",
            "hashed_password": hash_password("admin123"),
        }
    }


def load_user_db() -> dict:
    if not USERS_FILE.exists():
        users = _default_users()
        USERS_FILE.write_text(json.dumps(users, indent=2), encoding="utf-8")
        return users

    try:
        data = json.loads(USERS_FILE.read_text(encoding="utf-8"))
        if isinstance(data, dict):
            users = _default_users()
            users.update(data)
            return users
    except (json.JSONDecodeError, OSError):
        pass

    users = _default_users()
    USERS_FILE.write_text(json.dumps(users, indent=2), encoding="utf-8")
    return users


def save_user_db(users: dict) -> None:
    USERS_FILE.write_text(json.dumps(users, indent=2), encoding="utf-8")


FAKE_USER_DB = load_user_db()


def authenticate_user(email: str, password: str):
    user = FAKE_USER_DB.get(email)
    if not user:
        return None
    if not verify_password(password, user["hashed_password"]):
        return None
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    token = credentials.credentials
    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise credentials_error
    except JWTError as exc:
        raise credentials_error from exc

    user = FAKE_USER_DB.get(email)
    if user is None:
        raise credentials_error
    return user


@app.get("/")
def root():
    return {"message": "AlphaMetrics backend running"}


@app.post("/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest):
    user = authenticate_user(payload.email.strip().lower(), payload.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/auth/register")
def register(payload: RegisterRequest):
    email = payload.email.strip().lower()
    if email in FAKE_USER_DB:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )

    FAKE_USER_DB[email] = {
        "email": email,
        "full_name": payload.name.strip(),
        "occupation": payload.occupation.strip(),
        "hashed_password": hash_password(payload.password),
    }
    save_user_db(FAKE_USER_DB)

    return {"message": "Registered successfully"}


@app.get("/auth/verify")
def verify_token(current_user: dict = Depends(get_current_user)):
    return {
        "authenticated": True,
        "user": {
            "email": current_user["email"],
            "full_name": current_user["full_name"],
            "occupation": current_user.get("occupation", "Retail Professional"),
        },
    }
