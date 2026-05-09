import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const CartPage = () => {
    const { cartItems, getTotalAmount, getTotalItems, clearCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            return;
        }
        navigate('/checkout');
    };

    const handleContinueShopping = () => {
        navigate('/menu');
    };

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart">
                <div className="empty-cart-content">
                    <span className="empty-cart-icon">🛒</span>
                    <h2>Your Cart is Empty</h2>
                    <p>Add some delicious items to get started!</p>
                    <button onClick={handleContinueShopping} className="btn-primary">
                        Browse Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-header">
                <h1>Shopping Cart</h1>
                <p>{getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart</p>
            </div>

            <div className="cart-content">
                <div className="cart-items-section">
                    <div className="cart-items-header">
                        <button onClick={clearCart} className="btn-clear-cart">
                            Clear Cart
                        </button>
                    </div>

                    <div className="cart-items-list">
                        {cartItems.map((item) => (
                            <CartItem key={item._id} item={item} />
                        ))}
                    </div>
                </div>

                <div className="cart-summary">
                    <h2>Order Summary</h2>

                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>₹{getTotalAmount().toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span>Tax (5%)</span>
                        <span>₹{(getTotalAmount() * 0.05).toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span>Delivery Fee</span>
                        <span>₹50.00</span>
                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-row total">
                        <span>Total</span>
                        <span>₹{(getTotalAmount() * 1.05 + 50).toFixed(2)}</span>
                    </div>

                    <button onClick={handleCheckout} className="btn-checkout">
                        Proceed to Checkout
                    </button>

                    <button onClick={handleContinueShopping} className="btn-continue">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
