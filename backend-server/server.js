import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorMiddleware, notFoundMiddleware } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ========== MIDDLEWARE ==========

// CORS Configuration - IMPORTANT for frontend communication
app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    })
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (development)
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
}

// ========== ROUTES ==========

// Health check route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Retail Ordering Portal API is running',
        version: '1.0.0',
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// ========== ERROR HANDLING ==========

// 404 Handler
app.use(notFoundMiddleware);

// Global Error Handler
app.use(errorMiddleware);

// ========== START SERVER ==========

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const startServer = async () => {
    try {
        await connectDB();

        // Start server only after DB connection
        app.listen(PORT, () => {
            console.log('');
            console.log('='.repeat(50));
            console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
            console.log(`📡 Server URL: http://localhost:${PORT}`);
            console.log(`🔗 API Base: http://localhost:${PORT}/api`);
            console.log('='.repeat(50));
            console.log('');
        });
    } catch (error) {
        console.error('❌ Failed to connect to MongoDB:', error.message);
        process.exit(1);
    }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err.message);
    console.error('Shutting down server...');
    process.exit(1);
});
