import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(item._id);
        } else {
            updateQuantity(item._id, newQuantity);
        }
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
        <div className="cart-item">
            <div className="cart-item-image">
                <span className="item-icon">{getCategoryIcon(item.category)}</span>
            </div>

            <div className="cart-item-details">
                <h4 className="item-name">{item.name}</h4>
                <p className="item-category">{item.category}</p>
                <p className="item-price">₹{item.price.toFixed(2)} each</p>
            </div>

            <div className="cart-item-quantity">
                <button
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    className="qty-btn"
                >
                    -
                </button>
                <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min="1"
                    className="qty-input"
                />
                <button
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    className="qty-btn"
                >
                    +
                </button>
            </div>

            <div className="cart-item-total">
                <p className="item-subtotal">₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>

            <button
                onClick={() => removeFromCart(item._id)}
                className="btn-remove"
                aria-label="Remove item"
            >
                ✕
            </button>
        </div>
    );
};

export default CartItem;
