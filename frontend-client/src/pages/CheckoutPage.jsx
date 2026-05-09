import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';

const CheckoutPage = () => {
    const { cartItems, getTotalAmount, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderId, setOrderId] = useState('');

    const totalAmount = getTotalAmount() * 1.05 + 50; // Including tax and delivery

    const handlePlaceOrder = async () => {
        try {
            setLoading(true);
            setError('');

            // Prepare order data
            const orderData = {
                items: cartItems.map((item) => ({
                    productId: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                })),
                totalAmount: totalAmount,
                paymentMethod: paymentMethod,
            };

            // Log just the item names as requested
            const itemNames = orderData.items.map(item => item.name);
            console.log('📋 Order Items List:', itemNames);

            const response = await orderAPI.createOrder(orderData);

            setOrderId(response.data.order._id);
            setOrderSuccess(true);
            clearCart();

            // Redirect to menu after 3 seconds
            setTimeout(() => {
                navigate('/menu');
            }, 3000);

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order. Please try again.');
            console.error('Order error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="checkout-success">
                <div className="success-content">
                    <span className="success-icon">✓</span>
                    <h1>Order Placed Successfully!</h1>
                    <p>Order ID: <strong>{orderId}</strong></p>
                    <p>Thank you for your order, {user?.username}!</p>
                    <p className="redirect-message">Redirecting to menu...</p>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart">
                <div className="empty-cart-content">
                    <h2>Your cart is empty</h2>
                    <button onClick={() => navigate('/menu')} className="btn-primary">
                        Browse Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <h1>Checkout</h1>
            </div>

            {error && (
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    {error}
                </div>
            )}

            <div className="checkout-content">
                <div className="checkout-details">
                    <div className="checkout-section">
                        <h2>Order Summary</h2>
                        <div className="order-items">
                            {cartItems.map((item) => (
                                <div key={item._id} className="checkout-item">
                                    <span className="item-name">
                                        {item.name} × {item.quantity}
                                    </span>
                                    <span className="item-price">
                                        ₹{(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="checkout-section">
                        <h2>Payment Method</h2>
                        <div className="payment-methods">
                            <label className="payment-option">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <span>💳 Credit/Debit Card</span>
                            </label>
                            <label className="payment-option">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="upi"
                                    checked={paymentMethod === 'upi'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <span>📱 UPI</span>
                            </label>
                            <label className="payment-option">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <span>💵 Cash on Delivery</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="checkout-summary">
                    <h2>Payment Details</h2>

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
                        <span>Total Amount</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        className="btn-place-order"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Place Order'}
                    </button>

                    <button
                        onClick={() => navigate('/cart')}
                        className="btn-back"
                        disabled={loading}
                    >
                        Back to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
