import express from 'express';
import {
    createOrder,
    getUserOrders,
    getOrderById,
} from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   POST /api/orders
 * @desc    Create a new order
 * @access  Protected
 */
router.post('/', authMiddleware, createOrder);

/**
 * @route   GET /api/orders/user
 * @desc    Get all orders for logged-in user
 * @access  Protected
 */
router.get('/user', authMiddleware, getUserOrders);

/**
 * @route   GET /api/orders/:id
 * @desc    Get single order by ID
 * @access  Protected
 */
router.get('/:id', authMiddleware, getOrderById);

export default router;
