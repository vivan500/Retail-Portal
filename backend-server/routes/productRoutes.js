import express from 'express';
import {
    getAllProducts,
    getProductsByCategory,
    getProductById,
} from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Protected
 */
router.get('/', authMiddleware, getAllProducts);

/**
 * @route   GET /api/products/category/:category
 * @desc    Get products by category
 * @access  Protected
 */
router.get('/category/:category', authMiddleware, getProductsByCategory);

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Protected
 */
router.get('/:id', authMiddleware, getProductById);

export default router;
