import { useState } from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const getCategoryIcon = (category) => {
        switch (category?.toLowerCase()) {
            case 'pizza':
                return '🍕';
            case 'drinks':
                return '🥤';
            case 'bread':
                return '🍞';
            default:
                return '🍽️';
        }
    };

    return (
        <div className="product-card">
            <div className="product-image">
                <span className="product-icon">{getCategoryIcon(product.category)}</span>
                {product.inventoryCount < 10 && product.inventoryCount > 0 && (
                    <span className="low-stock-badge">Only {product.inventoryCount} left!</span>
                )}
                {product.inventoryCount === 0 && (
                    <span className="out-of-stock-badge">Out of Stock</span>
                )}
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-price">₹{product.price.toFixed(2)}</p>
                <p className="product-stock">
                    Stock: <span className={product.inventoryCount < 10 ? 'low-stock' : ''}>
                        {product.inventoryCount}
                    </span>
                </p>
            </div>

            <div className="product-actions">
                <div className="quantity-selector">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="qty-btn"
                        disabled={product.inventoryCount === 0}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                        max={product.inventoryCount}
                        className="qty-input"
                        disabled={product.inventoryCount === 0}
                    />
                    <button
                        onClick={() => setQuantity(Math.min(product.inventoryCount, quantity + 1))}
                        className="qty-btn"
                        disabled={product.inventoryCount === 0}
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={handleAddToCart}
                    className={`btn-add-cart ${added ? 'added' : ''}`}
                    disabled={product.inventoryCount === 0}
                >
                    {added ? '✓ Added!' : product.inventoryCount === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
