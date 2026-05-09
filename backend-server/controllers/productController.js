import Product from '../models/Product.js';

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Protected
 */
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ category: 1, name: 1 });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        console.error('Get All Products Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching products',
            error: error.message,
        });
    }
};

/**
 * @desc    Get products by category
 * @route   GET /api/products/category/:category
 * @access  Protected
 */
const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        // Validate category
        const validCategories = ['Pizza', 'Drinks', 'Bread'];
        if (!validCategories.includes(category)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category. Must be Pizza, Drinks, or Bread',
            });
        }

        const products = await Product.find({ category }).sort({ name: 1 });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        console.error('Get Products By Category Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching products',
            error: error.message,
        });
    }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Protected
 */
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error('Get Product By ID Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching product',
            error: error.message,
        });
    }
};

export { getAllProducts, getProductsByCategory, getProductById };
