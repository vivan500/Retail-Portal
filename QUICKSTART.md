# 🚀 Quick Start Guide - Retail Ordering Portal

## Step-by-Step Setup (5 Minutes)

### ✅ Prerequisites Check
1. **Node.js installed?** Run: `node --version` (should be v16+)
2. **MongoDB installed?** Run: `mongod --version`
3. **MongoDB running?** Start with: `mongod` or use MongoDB Atlas

---

## 🔧 Setup Instructions

### Step 1: Install Backend Dependencies
```bash
cd backend-server
npm install
```

### Step 2: Install Frontend Dependencies
```bash
cd ../frontend-client
npm install
```

### Step 3: Start MongoDB
```bash
# If using local MongoDB
mongod

# OR configure MongoDB Atlas URI in backend-server/.env
```

### Step 4: Seed the Database
```bash
cd ../backend-server
node seed.js
```

**Expected Output:**
```
✅ MongoDB Connected: localhost
🗑️  Cleared existing products
✅ Inserted 14 products
✅ Database seeded successfully!
```

### Step 5: Start Backend Server
```bash
# In backend-server directory
npm run dev
```

**Expected Output:**
```
🚀 Server running in development mode
📡 Server URL: http://localhost:5000
🔗 API Base: http://localhost:5000/api
```

### Step 6: Start Frontend (New Terminal)
```bash
# In frontend-client directory
npm run dev
```

**Expected Output:**
```
VITE v5.0.8  ready in 500 ms
➜  Local:   http://localhost:3000/
```

---

## 🎯 Test the Application

### 1. Register a New User
- Go to: `http://localhost:3000/register`
- Create account with:
  - Username: `testuser`
  - Email: `test@example.com`
  - Password: `password123`

### 2. Browse Products
- After registration, you'll be redirected to `/menu`
- See all products with inventory counts
- Filter by category: Pizza, Drinks, Bread

### 3. Add to Cart
- Click on products
- Adjust quantity
- Click "Add to Cart"
- See cart badge update in navbar

### 4. Checkout
- Go to Cart page
- Review items
- Click "Proceed to Checkout"
- Select payment method
- Place order

### 5. Verify Inventory Decrement
- Check MongoDB to see inventory reduced
- Try ordering more than available stock (should fail)

---

## 🧪 API Testing with Postman/Thunder Client

### Register User
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Products (Protected)
```http
GET http://localhost:5000/api/products
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### Create Order (Protected)
```http
POST http://localhost:5000/api/orders
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json

{
  "items": [
    {
      "productId": "PRODUCT_ID_FROM_DATABASE",
      "quantity": 2
    }
  ],
  "totalAmount": 598,
  "paymentMethod": "card"
}
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Start MongoDB: `mongod`
- Or update MONGO_URI in `.env` to use MongoDB Atlas

### Issue: "CORS Error"
**Solution:**
- Ensure backend is running on port 5000
- Check VITE_API_URL in frontend/.env

### Issue: "Module not found"
**Solution:**
- Run `npm install` in both directories
- Delete node_modules and reinstall

### Issue: "Port already in use"
**Solution:**
- Backend: Change PORT in backend-server/.env
- Frontend: Change port in vite.config.js

### Issue: "JWT Token Invalid"
**Solution:**
- Clear localStorage in browser
- Login again

---

## 📊 Verify Everything Works

### Check Backend Health
```bash
curl http://localhost:5000/
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Retail Ordering Portal API is running",
  "version": "1.0.0"
}
```

### Check Database
```bash
# Connect to MongoDB
mongosh

# Use database
use retail-ordering-portal

# Check products
db.products.find().pretty()

# Check users
db.users.find().pretty()

# Check orders
db.orders.find().pretty()
```

---

## 🎨 Customization

### Add Product Images
1. Place images in `frontend-client/public/assets/`
2. Update ProductCard component to use images
3. Modify Product model to include imageUrl field

### Change Color Scheme
- Edit CSS variables in `frontend-client/src/index.css`
- Modify `--primary`, `--secondary`, `--accent` colors

### Add More Categories
1. Update Product model enum in `backend-server/models/Product.js`
2. Add categories to filter in `frontend-client/src/pages/MenuPage.jsx`
3. Update seed.js with new category products

---

## 🚀 Production Deployment

### Backend (Heroku/Railway/Render)
1. Set environment variables
2. Use MongoDB Atlas for database
3. Update CORS origin to production URL

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Set VITE_API_URL to production backend URL
3. Deploy dist folder

---

## 📞 Need Help?

- Check README.md for detailed documentation
- Review code comments in controllers
- Test API endpoints with Postman
- Check browser console for frontend errors
- Check terminal for backend errors

---

**Happy Coding! 🎉**
