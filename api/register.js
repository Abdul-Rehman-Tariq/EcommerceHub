const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, password, role = 'user' } = req.body;

    console.log('Register request:', { name, email, role });

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    // Check if user already exists
    const existingUser = await knex('users')
      .where('email', email.toLowerCase())
      .first();

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const [newUser] = await knex('users')
      .insert({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning(['id', 'name', 'email', 'role', 'created_at']);

    // Generate token
    const token = jwt.sign(
      { 
        userId: newUser.id, 
        email: newUser.email, 
        role: newUser.role 
      },
      'your-secret-key-change-in-production',
      { expiresIn: '24h' }
    );

    // Return user and token
    const userResponse = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userResponse,
        token: token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  }
};
