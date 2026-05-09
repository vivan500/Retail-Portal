import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const { getTotalItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">🍕</span>
                    <span className="logo-text">Retail Portal this site is under maintainance</span>
                </Link>

                <div className="navbar-menu">
                    {isAuthenticated ? (
                        <>
                            <Link to="/menu" className="nav-link">
                                Menu
                            </Link>
                            <Link to="/cart" className="nav-link cart-link">
                                <span className="cart-icon">🛒</span>
                                Cart
                                {getTotalItems() > 0 && (
                                    <span className="cart-badge">{getTotalItems()}</span>
                                )}
                            </Link>
                            <div className="user-info">
                                <span className="user-name">👤 {user?.username}</span>
                                <button onClick={handleLogout} className="btn-logout">
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                            <Link to="/register" className="btn-primary">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
