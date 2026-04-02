# AlphaMetrics: AI-Powered Retail Intelligence

AlphaMetrics is a full-stack retail application that combines product management, image-based product matching, sales tracking, and business analytics. It uses an AI embedding pipeline to identify products from images and records transactions with real-time KPI summaries.

## Project Purpose

AlphaMetrics helps store owners and operators:
- register and manage inventory
- match products from uploaded/captured images
- record sales with stock and profit validation
- monitor key business metrics from a dashboard
- keep each user data scope isolated and secure

The project demonstrates a practical blend of full-stack development, JWT-based security, PostgreSQL persistence, and ML-powered similarity search.

## Architecture

```text
Frontend (React + Vite + Tailwind)
				|
				| HTTP/JSON
				v
Backend API (FastAPI)
	- Auth (JWT)
	- Products
	- Sales + Image Match
	- Analytics
				|
				v
ML Module
	- Image preprocessing
	- Embedding extraction (ResNet18)
	- Cosine similarity search
				|
				v
PostgreSQL
	- users
	- products
	- sales
```

## Tech Stack

- Frontend: React 18, Vite, Tailwind CSS
- Backend: FastAPI, Uvicorn, SQLAlchemy, Pydantic
- Database: PostgreSQL
- Auth/Security: JWT (`python-jose`), password hashing (`passlib[bcrypt]` with fallback)
- AI/ML: PyTorch, torchvision (ResNet18), OpenCV, Pillow, scikit-learn
- Analytics helpers: pandas, matplotlib

## Folder Structure

```text
AlphaMetrics/
├── backend/
│   ├── main.py
│   ├── users.json
│   └── uploads/
├── databse/
│   ├── schema.sql
│   └── seed_data.sql
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── ...
├── ml_module/
│   ├── image_preprocessing.py
│   ├── embedding_extractor.py
│   ├── similarity_search.py
│   ├── module_loader.py
│   └── evaluation.py
├── requirements.txt
└── README.MD
```

## Prerequisites

- Python 3.10+
- Node.js 16+
- PostgreSQL 12+
- Git

Recommended: at least 4 GB RAM for ML inference workflows.

## Environment Configuration

Create a `.env` file in `backend/`:

```env
DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/alphametrics
SECRET_KEY=your_very_strong_secret_key_here_minimum_32_chars
ACCESS_TOKEN_EXPIRE_MINUTES=120
```

## Local Setup and Run

### 1. Database

Create database:

```bash
createdb alphametrics
```

or from psql:

```sql
CREATE DATABASE alphametrics;
```

### 2. Backend

```bash
cd AlphaMetrics
python -m venv alphaenv
# Windows
alphaenv\Scripts\activate
# macOS/Linux
# source alphaenv/bin/activate

pip install -r requirements.txt

cd backend
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

API docs will be available at: `http://localhost:8000/docs`

### 3. Frontend

```bash
cd AlphaMetrics/frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

### 4. First Use Flow

1. Open the frontend URL.
2. Register a new account.
3. Log in.
4. Add products (preferably with images).
5. Test image matching and sale recording.
6. Review dashboard KPIs and sales history.

## Core Features

### Authentication and Security

- user registration and login
- JWT access tokens
- protected routes/pages on frontend
- backend dependency-based auth guard (`get_current_user` pattern)

### User Data Isolation

- per-user filtering in product and sales queries
- ownership validation before stock/sale actions
- user-specific upload paths (`uploads/{user_id}/...`)

### Product Management

- add products with name, category, buying price, quantity
- optional image upload
- automatic embedding generation when image is provided
- inventory listing and stock visibility

### AI-Assisted Product Matching

- query image upload from sell workflow
- preprocessing and embedding extraction with same pipeline as product images
- cosine similarity against that user's product embeddings
- top-k candidates with confidence labels

Confidence buckets (documented):
- very_high: >= 0.92
- high: >= 0.82
- medium: >= 0.72
- low: >= 0.62
- very_low: below 0.62

### Sales Recording and Calculations

- stock availability checks
- revenue calculation: `selling_price * quantity`
- profit calculation: `(selling_price - buying_price) * quantity`
- transaction logging with timestamps and similarity score
- stock decrement on successful sale

### Dashboard and Analytics

Analytics summary includes:
- total revenue
- total profit
- gross profit margin
- active products count
- remaining stock units
- sales transaction count
- low stock alerts
- top-selling products

## API Overview

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/verify`

### Products

- `POST /products`
- `GET /products`

### Sales and Matching

- `POST /sales/match-image`
- `POST /sales/record`
- `GET /sales/history`

### Analytics

- `GET /analytics/summary`

Protected endpoints require:

```http
Authorization: Bearer <token>
```

## AI Pipeline Summary

Product creation with image:
1. Save image to user upload folder.
2. Preprocess image to model input.
3. Extract deep embedding using ResNet18 backbone.
4. Combine with handcrafted visual features.
5. Normalize and store embedding in database.

Sell flow with image match:
1. Upload query image.
2. Extract query embedding with same pipeline.
3. Load user products that have embeddings.
4. Compute cosine similarity scores.
5. Return sorted top-k candidates.
6. Confirm selection and record sale.

## Troubleshooting

### Database connection errors

- ensure PostgreSQL service is running
- verify `DATABASE_URL`
- confirm `alphametrics` database exists

### Frontend cannot reach backend (CORS/network)

- backend should run on `127.0.0.1:8000`
- frontend should run on `localhost:5173`
- review CORS settings in backend if ports differ

### No match results

- ensure products were added with images
- products without embeddings are skipped in image matching

### Token expired (401)

- access tokens expire (default 120 minutes)
- log in again to get a new token

### Image upload issues

- verify upload folder permissions
- keep image size and format reasonable (`.jpg`, `.jpeg`, `.png`, `.webp`)

## Known Gaps and Future Improvements

High priority:
- add automated unit/integration tests
- implement refresh token flow
- add pagination for product and history endpoints

Medium priority:
- migrate embedding storage to `pgvector`
- add advanced filters and richer reporting exports
- improve frontend notifications and bulk import support

Long term:
- forecasting module
- mobile client
- multi-branch tenant support
- deployment hardening (CI/CD, monitoring, containerization)

## Development Notes

- current status: MVP complete and feature-ready
- production hardening still required (rate limiting, security hardening, observability)
- extensive implementation notes are available in the root `notes/` folder

## Quick Checklist

- [ ] configure `.env`
- [ ] create PostgreSQL database
- [ ] install backend dependencies
- [ ] run FastAPI server
- [ ] install frontend dependencies
- [ ] run Vite dev server
- [ ] register user and log in
- [ ] add products with images
- [ ] test match + record sale flow
- [ ] validate dashboard KPIs

---

Last updated: April 2, 2026
