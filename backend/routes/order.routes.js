import express from 'express';
import { 
  createOrder,
  getAllOrders, 
  getOrderById, 
  updateOrderStatus,
  getOrderStats,
  getUserOrders
} from '../controllers/order.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

// Create a new order (authenticated users)
router.post('/', authenticateToken, createOrder);

// Get all orders (admin only)
router.get('/all', authenticateToken, requireRole('admin'), getAllOrders);

// Get order statistics (admin only)
router.get('/stats', authenticateToken, requireRole('admin'), getOrderStats);

// Get current user's orders
router.get('/my-orders', authenticateToken, getUserOrders);

// Get order by ID
router.get('/:id', authenticateToken, getOrderById);

// Update order status (admin only)
router.patch('/:id/status', authenticateToken, requireRole('admin'), updateOrderStatus);

export default router;
