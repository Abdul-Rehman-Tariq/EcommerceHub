# Database Setup Guide

## PostgreSQL Installation and Setup

### 1. Install PostgreSQL

**Windows:**
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer and follow the setup wizard
3. Remember the password you set for the 'postgres' user
4. Default port is 5432

**Alternative - Using Docker:**
```bash
docker run --name postgres-auth-cart -e POSTGRES_PASSWORD=password -e POSTGRES_DB=auth_cart_db -p 5432:5432 -d postgres:13
```

### 2. Create Database

**Using PostgreSQL Command Line (psql):**
```sql
CREATE DATABASE auth_cart_db;
```

**Using pgAdmin (GUI):**
1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Right-click on "Databases" → Create → Database
4. Name: `auth_cart_db`

### 3. Update Environment Variables

Edit the `.env` file in the `backend` folder:

```env
NODE_ENV=development
PORT=5000

# Database Configuration - Update these with your credentials
DB_HOST=localhost
DB_PORT=5432
DB_NAME=auth_cart_db
DB_USER=postgres
DB_PASSWORD=your_actual_password_here
DATABASE_URL=postgresql://postgres:your_actual_password_here@localhost:5432/auth_cart_db

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_change_this_in_production_12345
JWT_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=http://localhost:8080
```

### 4. Run Database Migrations

After setting up the database and updating the `.env` file:

```bash
cd backend
npm run migrate
```

### 5. (Optional) Run Database Seeds

To populate the database with sample data:

```bash
npm run seed
```

This will create:
- 2 sample users (admin@example.com and test@example.com, both with password: password123)
- 5 sample products

### 6. Verify Setup

Test the database connection by starting the server:

```bash
npm run dev
```

Then visit: http://localhost:5000/health

You should see a success response if everything is working correctly.

## Troubleshooting

### Common Issues:

1. **Connection refused error:**
   - Make sure PostgreSQL is running
   - Check if the port 5432 is correct
   - Verify your credentials in the `.env` file

2. **Database does not exist:**
   - Make sure you created the `auth_cart_db` database
   - Check the database name in your `.env` file

3. **Authentication failed:**
   - Verify the username and password in the `.env` file
   - Make sure the user has access to the database

4. **Migration errors:**
   - Make sure the database exists before running migrations
   - Check if there are any syntax errors in migration files

### Test Database Connection:

You can test the connection using psql:

```bash
psql -h localhost -p 5432 -U postgres -d auth_cart_db
```

Or using a GUI tool like pgAdmin, DBeaver, or TablePlus.

## Quick Start with Default Settings

If you want to use the default settings:

1. Install PostgreSQL with user `postgres` and password `password`
2. Create database `auth_cart_db`
3. The `.env` file should work with these defaults
4. Run migrations: `npm run migrate`
5. Run seeds: `npm run seed`
6. Start server: `npm run dev`
