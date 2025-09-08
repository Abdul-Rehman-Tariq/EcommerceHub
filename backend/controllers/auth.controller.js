import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

export const register = async (req, res, next) => {
  try {
    console.log('📝 Registration request received:', req.body);
    const { username, email, password } = req.body;

    console.log('🔍 Checking for existing user with email:', email);
    // Check if user already exists
    const existingUser = await User.findByEmailOrUsername(email);
    if (existingUser) {
      console.log('❌ User already exists:', existingUser.email);
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    console.log('🔍 Checking for existing username:', username);
    const existingUsername = await User.findByUsername(username);
    if (existingUsername) {
      console.log('❌ Username already taken:', existingUsername.username);
      return res.status(400).json({
        success: false,
        message: 'Username already taken'
      });
    }

    console.log('🔒 Hashing password...');
    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log('👤 Creating user...');
    // Create user
    const userData = {
      username,
      email,
      password: hashedPassword
    };

    const user = await User.create(userData);
    console.log('✅ User created successfully:', user.id);
    
    // Generate token
    const token = generateToken(user.id);

    // Remove password from response
    const { password: _, ...userResponse } = user;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user: userResponse
      }
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or username

    // Find user by email or username
    const user = await User.findByEmailOrUsername(identifier);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user.id);

    // Remove password from response
    const { password: _, ...userResponse } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: userResponse
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      data: {
        user: req.user
      }
    });
  } catch (error) {
    next(error);
  }
};
