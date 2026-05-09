import { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const MenuPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const categories = ['All', 'Pizza', 'Drinks', 'Bread'];

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter(
                    (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
                )
            );
        }
    }, [selectedCategory, products]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productAPI.getAllProducts();
            // Backend returns products in response.data.data
            const productsData = response.data.data || response.data;
            console.log('✅ Products loaded:', productsData.length, 'items');
            setProducts(productsData);
            setFilteredProducts(productsData);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load products');
            console.error('❌ Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading menu...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>⚠️ Error</h2>
                <p>{error}</p>
                <button onClick={fetchProducts} className="btn-primary">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="menu-page">
            <div className="menu-header">
                <h1>Our Menu</h1>
                <p>Choose from our delicious selection</p>
            </div>

            <div className="category-filter">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {filteredProducts.length === 0 ? (
                <div className="no-products">
                    <p>No products available in this category</p>
                </div>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuPage;
