import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Routes
import authRoutes from '../backend/routes/auth.routes.js';
import productRoutes from '../backend/routes/product.routes.js';
import orderRoutes from '../backend/routes/order.routes.js';

// Middleware
import { errorHandler, notFound } from '../backend/middleware/error.middleware.js';

const app = express();

// Rate limiting for production
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});

// Security middleware
app.use(helmet());
app.use(limiter);

// CORS configuration for production
app.use(cors({
  origin: true, // Allow all origins for now (we can restrict later)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoints
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'EcommerceHub API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    database: process.env.DATABASE_URL ? 'Connected' : 'Not configured'
  });
});

// API routes (without /api prefix since Vercel handles that)
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
