# 🌐 Deployment Guide - Retail Ordering Portal

## Overview
This guide covers deploying the Retail Ordering Portal to production environments.

---

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free tier
3. Create a new cluster

### Step 2: Configure Database
1. Click "Connect" on your cluster
2. Add your IP address to whitelist (or allow from anywhere: 0.0.0.0/0)
3. Create database user with password
4. Get connection string

### Step 3: Update Backend .env
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/retail-ordering-portal?retryWrites=true&w=majority
```

### Step 4: Seed Production Database
```bash
cd backend-server
node seed.js
```

---

## 🚀 Backend Deployment

### Option 1: Railway.app (Recommended)

#### Setup
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Select `backend-server` as root directory

#### Environment Variables
Add these in Railway dashboard:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_super_secret_production_key_change_this
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
```

#### Deploy
- Railway auto-deploys on git push
- Get your backend URL: `https://your-app.railway.app`

---

### Option 2: Render.com

#### Setup
1. Go to [Render.com](https://render.com)
2. Create new "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Root Directory**: `backend-server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### Environment Variables
Same as Railway above

---

### Option 3: Heroku

#### Setup
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
cd backend-server
heroku create your-app-name

# Set environment variables
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

---

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

#### Setup
1. Go to [Vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend-client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### Environment Variables
Add in Vercel dashboard:
```env
VITE_API_URL=https://your-backend.railway.app/api
```

#### Deploy
- Auto-deploys on git push
- Get URL: `https://your-app.vercel.app`

---

### Option 2: Netlify

#### Setup
1. Go to [Netlify.com](https://netlify.com)
2. Import from GitHub
3. Configure:
   - **Base Directory**: `frontend-client`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `frontend-client/dist`

#### Environment Variables
```env
VITE_API_URL=https://your-backend.railway.app/api
```

#### Redirects
Create `frontend-client/public/_redirects`:
```
/*    /index.html   200
```

---

### Option 3: GitHub Pages (Static Only)

```bash
cd frontend-client

# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

---

## 🔧 Production Configuration

### Backend Updates

#### 1. Update CORS in server.js
```javascript
app.use(
  cors({
    origin: [
      'https://your-frontend.vercel.app',
      'https://your-custom-domain.com'
    ],
    credentials: true,
  })
);
```

#### 2. Add Security Headers
```bash
npm install helmet
```

```javascript
import helmet from 'helmet';
app.use(helmet());
```

#### 3. Add Rate Limiting
```bash
npm install express-rate-limit
```

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

#### 4. Add Compression
```bash
npm install compression
```

```javascript
import compression from 'compression';
app.use(compression());
```

---

### Frontend Updates

#### 1. Update API URL
In `.env.production`:
```env
VITE_API_URL=https://your-backend.railway.app/api
```

#### 2. Add Error Tracking (Optional)
```bash
npm install @sentry/react
```

#### 3. Add Analytics (Optional)
```bash
npm install react-ga4
```

---

## 🔒 Security Checklist

### Backend
- [ ] Strong JWT_SECRET (use random generator)
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] Rate limiting implemented
- [ ] Helmet.js for security headers
- [ ] Input validation on all endpoints
- [ ] Error messages don't expose sensitive info

### Frontend
- [ ] API URL points to HTTPS backend
- [ ] No sensitive data in localStorage
- [ ] HTTPS enabled (automatic on Vercel/Netlify)
- [ ] Environment variables prefixed with VITE_

---

## 📊 Monitoring & Logging

### Backend Monitoring

#### Option 1: PM2 (Self-hosted)
```bash
npm install -g pm2

# Start with PM2
pm2 start server.js --name retail-api

# Monitor
pm2 monit

# Logs
pm2 logs
```

#### Option 2: New Relic
1. Sign up at [New Relic](https://newrelic.com)
2. Install agent:
```bash
npm install newrelic
```
3. Add to server.js:
```javascript
require('newrelic');
```

### Frontend Monitoring

#### Google Analytics
```javascript
import ReactGA from 'react-ga4';

ReactGA.initialize('YOUR_GA_TRACKING_ID');
```

---

## 🧪 Pre-Deployment Testing

### Backend Tests
```bash
# Test health endpoint
curl https://your-backend.railway.app/

# Test auth
curl -X POST https://your-backend.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123"}'
```

### Frontend Tests
1. Test all routes work
2. Test authentication flow
3. Test order placement
4. Test on mobile devices
5. Check browser console for errors

---

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          # Railway auto-deploys on push

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          # Vercel auto-deploys on push
```

---

## 📱 Custom Domain Setup

### Backend (Railway)
1. Go to Railway dashboard
2. Settings → Domains
3. Add custom domain
4. Update DNS records

### Frontend (Vercel)
1. Go to Vercel dashboard
2. Settings → Domains
3. Add custom domain
4. Update DNS records

---

## 🐛 Troubleshooting Production Issues

### Backend Not Responding
- Check Railway/Render logs
- Verify MongoDB Atlas connection
- Check environment variables
- Verify CORS settings

### Frontend Can't Connect to Backend
- Check VITE_API_URL is correct
- Verify backend is running
- Check CORS configuration
- Check browser console for errors

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has permissions
- Check network connectivity

---

## 📈 Scaling Considerations

### Database
- Enable MongoDB Atlas auto-scaling
- Add indexes for frequently queried fields
- Consider read replicas for high traffic

### Backend
- Use Railway/Render auto-scaling
- Implement caching (Redis)
- Use CDN for static assets
- Consider load balancer for multiple instances

### Frontend
- Vercel/Netlify auto-scale
- Use CDN (automatic on these platforms)
- Optimize images
- Code splitting

---

## 💰 Cost Estimates

### Free Tier (Suitable for MVP)
- **MongoDB Atlas**: Free (512MB)
- **Railway**: Free tier available
- **Vercel**: Free for personal projects
- **Total**: $0/month

### Production (Low Traffic)
- **MongoDB Atlas**: $9/month (Shared cluster)
- **Railway**: $5/month
- **Vercel**: Free
- **Total**: ~$14/month

### Production (Medium Traffic)
- **MongoDB Atlas**: $25/month (Dedicated)
- **Railway**: $20/month
- **Vercel**: Free
- **Total**: ~$45/month

---

## 🎯 Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database seeded with products
- [ ] Can register new user
- [ ] Can login
- [ ] Can browse products
- [ ] Can add to cart
- [ ] Can place order
- [ ] Inventory decrements correctly
- [ ] HTTPS enabled on both
- [ ] Custom domain configured (optional)
- [ ] Monitoring set up
- [ ] Error tracking configured
- [ ] Analytics configured (optional)

---

## 📞 Support Resources

- **Railway**: [docs.railway.app](https://docs.railway.app)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Render**: [render.com/docs](https://render.com/docs)

---

**Deployment Complete! 🎉**

Your Retail Ordering Portal is now live and ready for users!
