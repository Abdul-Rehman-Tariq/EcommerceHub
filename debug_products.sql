-- Check the products table structure and data
SELECT 
  id,
  name,
  description,
  price,
  stock_quantity,
  image_url,
  created_at
FROM products 
ORDER BY created_at DESC 
LIMIT 10;
