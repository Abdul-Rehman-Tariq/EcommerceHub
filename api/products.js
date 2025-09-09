// Database configuration for Supabase
const knexConfig = {
  client: 'pg',
  connection: {
    host: 'db.vzmdvwxqikihgltayxtk.supabase.co',
    port: 5432,
    user: 'postgres',
    password: 'Murtaza123@',
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
  }
};

const knex = require('knex')(knexConfig);

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    console.log('Fetching products...');

    // Get all products
    const products = await knex('products')
      .select('*')
      .orderBy('created_at', 'desc');

    console.log(`Found ${products.length} products`);

    res.status(200).json({
      success: true,
      data: products
    });

  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error fetching products'
    });
  }
};
