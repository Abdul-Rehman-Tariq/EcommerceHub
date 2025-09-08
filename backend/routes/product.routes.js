import express from 'express';
import { 
  createProduct, 
  getAllProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} from '../controllers/product.controller.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.middleware.js';
import { validateProduct, validateProductUpdate } from '../middleware/validation.middleware.js';
import { uploadSingleImage } from '../middleware/upload.middleware.js';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getAllProducts);
router.get('/:id', optionalAuth, getProductById);

// Protected routes (require authentication)
router.post('/', authenticateToken, uploadSingleImage, validateProduct, createProduct);
router.put('/:id', authenticateToken, uploadSingleImage, validateProductUpdate, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

export default router;
