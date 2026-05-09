import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

/**
 * @desc    Create a new order with inventory management
 * @route   POST /api/orders
 * @access  Protected
 */
const createOrder = async (req, res) => {
    // Start a MongoDB session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { items, totalAmount, paymentMethod } = req.body;
        const userId = req.user._id;

        // Validation
        if (!items || items.length === 0) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'Order must contain at least one item',
            });
        }

        if (!totalAmount || totalAmount <= 0) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'Invalid total amount',
            });
        }

        // Array to store updated items with product details
        const orderItems = [];

        // CRITICAL: Check inventory and decrement stock for each item
        for (const item of items) {
            const { productId, quantity } = item;

            // Find product
            const product = await Product.findById(productId).session(session);

            if (!product) {
                await session.abortTransaction();
                return res.status(404).json({
                    success: false,
                    message: `Product not found: ${productId}`,
                });
            }

            // Check if sufficient inventory is available
            if (product.inventoryCount < quantity) {
                await session.abortTransaction();
                return res.status(400).json({
                    success: false,
                    message: `Insufficient inventory for ${product.name}. Available: ${product.inventoryCount}, Requested: ${quantity}`,
                });
            }

            // DECREMENT INVENTORY - This is the crucial business logic
            product.inventoryCount -= quantity;
            await product.save({ session });

            // Add to order items
            orderItems.push({
                productId: product._id,
                name: product.name,
                quantity: quantity,
                price: product.price,
            });

            console.log(`✅ Decremented ${product.name} inventory by ${quantity}. New count: ${product.inventoryCount}`);
        }

        // Create the order
        const order = await Order.create(
            [
                {
                    userId,
                    items: orderItems,
                    totalAmount,
                    status: 'Pending',
                    paymentMethod: paymentMethod || 'cod',
                },
            ],
            { session }
        );

        // Commit the transaction
        await session.commitTransaction();
        console.log(`✅ Order created successfully: ${order[0]._id}`);

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order: order[0],
        });
    } catch (error) {
        // Rollback transaction on error
        await session.abortTransaction();
        console.error('Create Order Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating order',
            error: error.message,
        });
    } finally {
        session.endSession();
    }
};

/**
 * @desc    Get all orders for logged-in user
 * @route   GET /api/orders/user
 * @access  Protected
 */
const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;

        const orders = await Order.find({ userId })
            .populate('items.productId', 'name category')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders,
        });
    } catch (error) {
        console.error('Get User Orders Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching orders',
            error: error.message,
        });
    }
};

/**
 * @desc    Get single order by ID
 * @route   GET /api/orders/:id
 * @access  Protected
 */
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('userId', 'username email')
            .populate('items.productId', 'name category price');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        // Ensure user can only view their own orders
        if (order.userId._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this order',
            });
        }

        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        console.error('Get Order By ID Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching order',
            error: error.message,
        });
    }
};

export { createOrder, getUserOrders, getOrderById };
