# Auth Cart Backend

A full-stack authentication and product management backend built with Node.js, Express.js, PostgreSQL, and JWT.

## Features

- 🔐 JWT Authentication (Register/Login)
- 🛍️ Product CRUD Operations
- 🗄️ PostgreSQL Database with Knex.js
- 🔒 Protected Routes Middleware
- 🛡️ Input Validation with Joi
- 🚀 MVC Architecture
- 📝 Database Migrations & Seeds

## Quick Start

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- npm or yarn

### Installation

1. **Clone and navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Set up PostgreSQL database**
   ```sql
   CREATE DATABASE auth_cart_db;
   ```

5. **Run migrations**
   ```bash
   npm run migrate
   ```

6. **Run seeds (optional)**
   ```bash
   npm run seed
   ```

7. **Start development server**
   ```bash
   npm run dev
   ```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile (protected)

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `POST /products` - Create product (protected)
- `PUT /products/:id` - Update product (protected)
- `DELETE /products/:id` - Delete product (protected)

## Environment Variables

```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=auth_cart_db
DB_USER=your_username
DB_PASSWORD=your_password
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/auth_cart_db
JWT_SECRET=your_super_secure_jwt_secret_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:8080
```

## Project Structure

```
backend/
├── app.js                 # Express entry point
├── package.json
├── .env.example
├── knexfile.js           # Knex configuration
├── config/
│   └── db.js            # Database connection
├── models/
│   ├── user.model.js
│   └── product.model.js
├── controllers/
│   ├── auth.controller.js
│   └── product.controller.js
├── routes/
│   ├── auth.routes.js
│   └── product.routes.js
├── middleware/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── validation.middleware.js
└── migrations/
    ├── 001_create_users_table.js
    └── 002_create_products_table.js
```

## Database Schema

### Users Table
- `id` (Primary Key)
- `username` (String, Unique)
- `email` (String, Unique)
- `password` (String, Hashed)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Products Table
- `id` (Primary Key)
- `name` (String)
- `description` (String)
- `price` (Decimal)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## Testing with Postman

1. Import the Postman collection (if provided)
2. Set up environment variables:
   - `baseUrl`: `http://localhost:5000`
   - `authToken`: (will be set after login)

## Deployment

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use strong `JWT_SECRET`
- Configure proper database credentials
- Set appropriate `FRONTEND_URL`

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run migrate` - Run database migrations
- `npm run seed` - Run database seeds
- `npm run migrate:rollback` - Rollback last migration
- `npm run migrate:make <name>` - Create new migration
