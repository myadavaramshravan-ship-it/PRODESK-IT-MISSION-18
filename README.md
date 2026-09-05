# Aura Engine

A premium inventory management and analytics portal built with React + Vite on the frontend and Express + MongoDB on the backend.

## Project Overview

Aura Engine is designed as an enterprise operations dashboard for managing large-scale inventory data. The application includes:

- dashboard analytics and KPI cards
- inventory workspace with search, filters, sorting, and pagination
- responsive desktop and mobile layouts
- MongoDB-backed product data model
- aggregation-based analytics for valuation and restock insights
- strict validation for inventory integrity rules

## Tech Stack

Frontend:
- React
- Vite
- Recharts
- Axios

Backend:
- Node.js
- Express
- MongoDB
- Mongoose
- Zod

## Project Structure

- `client/` - React frontend application
- `server/` - Express API and MongoDB logic
- `server/models/` - Mongoose schema definitions
- `server/controllers/` - inventory and analytics controllers
- `server/routes/` - API routing
- `server/validators/` - Zod validation schema
- `server/scripts/seedProducts.js` - mock data generator for 50,000 records
- `vercel.json` - Vercel configuration for the client SPA

## Requirements Covered

- Product schema with `productName`, `sku`, `category`, `price`, `cost`, `stockQuantity`, `reorderLevel`, and `lastUpdated`
- 50,000 realistic mock product seed generation
- MongoDB indexes on `sku`, `category`, and `productName`
- Inventory endpoints for listing, single-product lookup, creation, updates, and deletion
- Optimized `GET /api/inventory` with pagination, product name/SKU search, category filtering, and sorting
- Aggregated analytics for totals, restock priority, and category valuation using MongoDB pipelines
- Validation for business rules such as:
  - `price >= cost`
  - `stockQuantity >= 0`

JWT authentication is not included because it is outside the mandatory Track B requirements. It can be added later with user accounts, protected routes, and role-based access.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/inventory` | List products with pagination, search, filters, and sorting |
| `GET` | `/api/inventory/:id` | Get one product |
| `POST` | `/api/inventory` | Create a validated product |
| `PUT` | `/api/inventory/:id` | Update a validated product |
| `DELETE` | `/api/inventory/:id` | Delete a product |
| `GET` | `/api/analytics` | Return aggregation-based inventory analytics |

Example inventory request:

```text
/api/inventory?page=1&limit=50&search=audio&category=Electronics&sort=-price
```

## Run the Project

### 1. Frontend

```bash
cd client
npm install
npm run dev
```

### 2. Backend

```bash
cd server
npm install
npm run dev
```

### 3. Seed database data

```bash
cd server
npm run seed
```

The seeder clears the existing products collection, generates 50,000 products, inserts them in batches of 1,000, and prints the final document count. Run it only against the intended database.

### 4. Deploy the frontend to Vercel

Import the repository into Vercel and keep the project root at the repository root. The included `vercel.json` builds the Vite client from `client/` and serves the SPA entry point.

Add this Vercel environment variable:

```env
VITE_API_URL=https://your-backend-service.example.com/api
```

Deploy the Express/MongoDB server separately and use its public `/api` URL for `VITE_API_URL`.

## Environment Variables

Create a `.env` file inside the `server` folder with your MongoDB connection string and client URL:

```env
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
PORT=5000
```

For local client development, create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

For Vercel, set `VITE_API_URL` to the public `/api` URL of the separately deployed backend.

