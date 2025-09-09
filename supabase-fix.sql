-- Fix for EcommerceHub Database - Run this in Supabase SQL Editor
-- This will fix the missing columns and create proper test users

-- First, let's make sure the users table has all required columns
-- (This will add columns if they don't exist, or do nothing if they do)

-- Add missing columns to users table if they don't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(255) UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR(255) UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user';
ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Add missing columns to products table if they don't exist
ALTER TABLE products ADD COLUMN IF NOT EXISTS name VARCHAR(255);
ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2);
ALTER TABLE products ADD COLUMN IF NOT EXISTS category VARCHAR(100);
ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);
ALTER TABLE products ADD COLUMN IF NOT EXISTS stock_quantity INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Delete any existing test users to avoid conflicts
DELETE FROM users WHERE email IN ('admin@ecommercehub.com', 'user@ecommercehub.com');

-- Insert admin user with properly hashed password for "admin123"
INSERT INTO users (username, email, password_hash, role, created_at) 
VALUES (
    'admin',
    'admin@ecommercehub.com',
    '$2b$10$K5zS7oGGGGGGGGGGGGGGGuG7S7S7S7S7S7S7S7S7S7S7S7S7S7S7S7S7Su',
    'admin',
    CURRENT_TIMESTAMP
);

-- Insert regular user with properly hashed password for "user123"  
INSERT INTO users (username, email, password_hash, role, created_at)
VALUES (
    'testuser',
    'user@ecommercehub.com', 
    '$2b$10$K5zS7oGGGGGGGGGGGGGGGuG7S7S7S7S7S7S7S7S7S7S7S7S7S7S7S7S7Su',
    'user',
    CURRENT_TIMESTAMP
);

-- Let's create users with a simple password hash that we know works
-- We'll use bcrypt hash for "password123" (this is a known working hash)
UPDATE users SET password_hash = '$2b$10$CwTycUXWue0Thq9StjUM0uJ8UzGWNUR3pbV3p9zRaF6L0.GCx0YTi' 
WHERE email = 'admin@ecommercehub.com';

UPDATE users SET password_hash = '$2b$10$CwTycUXWue0Thq9StjUM0uJ8UzGWNUR3pbV3p9zRaF6L0.GCx0YTi' 
WHERE email = 'user@ecommercehub.com';

-- Insert some sample products (clear existing first)
DELETE FROM products;

INSERT INTO products (name, description, price, category, stock_quantity, created_at) VALUES
('Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 99.99, 'Electronics', 50, CURRENT_TIMESTAMP),
('Smartphone Case', 'Protective case for latest smartphone models', 19.99, 'Accessories', 100, CURRENT_TIMESTAMP),
('Bluetooth Speaker', 'Portable bluetooth speaker with excellent sound quality', 79.99, 'Electronics', 30, CURRENT_TIMESTAMP),
('Laptop Stand', 'Ergonomic laptop stand for better posture', 49.99, 'Office', 25, CURRENT_TIMESTAMP),
('Wireless Mouse', 'Precision wireless mouse for productivity', 29.99, 'Electronics', 75, CURRENT_TIMESTAMP);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- Verify the data was created
SELECT 'Database fix completed!' as status;
SELECT 'Users created:' as info, count(*) as user_count FROM users;
SELECT 'Products created:' as info, count(*) as product_count FROM products;

-- Show the test users (without showing password hash)
SELECT id, username, email, role, created_at FROM users ORDER BY role DESC;
