import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import './App.css';

function App() {
    return (
        
        <Router>
            <AuthProvider>
                <CartProvider>
                    <div className="app">
                        <Navbar />
                        <main className="main-content">
                            <Routes>
                                <Route path="/" element={<Navigate to="/menu" replace />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route
                                    path="/menu"
                                    element={
                                        <ProtectedRoute>
                                            <MenuPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/cart"
                                    element={
                                        <ProtectedRoute>
                                            <CartPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/checkout"
                                    element={
                                        <ProtectedRoute>
                                            <CheckoutPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route path="*" element={<Navigate to="/menu" replace />} />
                            </Routes>
                        </main>
                    </div>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
