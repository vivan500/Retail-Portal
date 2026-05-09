/**
 * Centralized error handling middleware
 */
const errorMiddleware = (err, req, res, next) => {
    console.error('Error Stack:', err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

/**
 * Handle 404 - Not Found
 */
const notFoundMiddleware = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

export { errorMiddleware, notFoundMiddleware };
