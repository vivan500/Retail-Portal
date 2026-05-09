import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API calls
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
};

// Product API calls
export const productAPI = {
    getAllProducts: () => api.get('/products'),
    getProductsByCategory: (category) => api.get(`/products/category/${category}`),
    getProductById: (id) => api.get(`/products/${id}`),
};

// Order API calls
export const orderAPI = {
    createOrder: (orderData) => api.post('/orders', orderData),
    getUserOrders: () => api.get('/orders/user'),
    getOrderById: (id) => api.get(`/orders/${id}`),
};

export default api;
