# E-commerce Project Deployment Guide

## Overview
This guide will help you deploy your full-stack e-commerce application to GitHub and Render.

## Project Structure
- **Backend**: Node.js/Express API server
- **Frontend**: React application with Vite
- **Database**: MongoDB Atlas
- **Deployment**: Render.com

## Prerequisites
- GitHub account
- Render account
- MongoDB Atlas account
- Git installed locally

## Step-by-Step Deployment Process

### Phase 1: GitHub Setup ✅

1. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: E-commerce project with React frontend and Node.js backend"
   ```

2. **Create GitHub Repository**
   - Go to GitHub.com
   - Click "New repository"
   - Name: `ecommerce-app`
   - Set to Public
   - Don't initialize with README

3. **Push to GitHub**
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ecommerce-app.git
   git push -u origin main
   ```

### Phase 2: MongoDB Atlas Setup ✅

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up/Login

2. **Create Cluster**
   - Choose FREE tier (M0 Sandbox)
   - Select region close to your location
   - Click "Create Cluster"

3. **Database Access**
   - Go to "Database Access"
   - Add New Database User
   - Create username and password
   - Set privileges to "Read and write to any database"

4. **Network Access**
   - Go to "Network Access"
   - Add IP Address
   - Allow Access from Anywhere (0.0.0.0/0)

5. **Get Connection String**
   - Go to "Clusters"
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` and `<dbname>`

### Phase 3: Render Deployment

#### Backend Deployment

1. **Create Web Service**
   - Go to [Render.com](https://render.com)
   - Sign up with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Backend Configuration**
   - **Name**: `ecommerce-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run server`
   - **Root Directory**: (leave empty)
   - **Instance Type**: Free

3. **Backend Environment Variables**
   ```
   MONGO_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
   PORT=8080
   DEV_MODE=production
   JWT_SECRET=your-super-secret-jwt-key-here
   RAZORPAY_KEY_ID=your-razorpay-key-id
   RAZORPAY_KEY_SECRET=your-razorpay-key-secret
   CLIENT_URL=https://your-frontend-service-name.onrender.com
   ```

#### Frontend Deployment

1. **Create Another Web Service**
   - Click "New +" → "Web Service"
   - Select same GitHub repository

2. **Frontend Configuration**
   - **Name**: `ecommerce-frontend`
   - **Environment**: `Node`
   - **Build Command**: `cd client && npm install && npm run build`
   - **Start Command**: `cd client && npm run preview`
   - **Root Directory**: (leave empty)
   - **Instance Type**: Free

3. **Frontend Environment Variables**
   ```
   VITE_API_URL=https://your-backend-service-name.onrender.com
   ```

### Phase 4: Update Configuration

The project has been updated with:
- ✅ `.env` file template
- ✅ `.gitignore` file
- ✅ API configuration (`client/src/config/api.js`)
- ✅ Axios base URL configuration

### Phase 5: Testing

1. **Backend Test**
   - Visit: `https://your-backend-service-name.onrender.com`
   - Should see: "Welcome to page"

2. **Frontend Test**
   - Visit: `https://your-frontend-service-name.onrender.com`
   - Should load the React application

3. **Full Application Test**
   - Test user registration/login
   - Test product browsing
   - Test cart functionality
   - Test admin features

## Important Notes

### Environment Variables
- **Never commit** `.env` files to GitHub
- Use Render's environment variables for production
- Keep your MongoDB credentials secure

### CORS Configuration
- Backend is configured to accept requests from frontend
- Update `CLIENT_URL` in backend environment variables

### Database
- MongoDB Atlas provides free tier with 512MB storage
- Monitor usage to avoid exceeding limits

### Render Free Tier Limitations
- Services may sleep after 15 minutes of inactivity
- First request after sleep may take 30+ seconds
- Consider upgrading for production use

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check build logs in Render dashboard

2. **Database Connection Issues**
   - Verify MongoDB connection string
   - Check network access settings
   - Ensure database user has correct permissions

3. **CORS Errors**
   - Update `CLIENT_URL` in backend environment variables
   - Check frontend API configuration

4. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names match exactly
   - Restart services after updating variables

### Useful Commands

```bash
# Check local build
npm run build

# Test production build locally
npm run preview

# Check environment variables
echo $VITE_API_URL
```

## Next Steps

1. **Domain Setup** (Optional)
   - Purchase custom domain
   - Configure DNS settings
   - Update CORS and environment variables

2. **SSL Certificate**
   - Render provides free SSL certificates
   - Automatically enabled for custom domains

3. **Monitoring**
   - Set up error tracking (Sentry)
   - Monitor performance and uptime
   - Set up logging

4. **Scaling**
   - Upgrade Render plan for better performance
   - Implement caching strategies
   - Optimize database queries

## Support

- **Render Documentation**: https://render.com/docs
- **MongoDB Atlas Documentation**: https://docs.atlas.mongodb.com/
- **React Deployment Guide**: https://create-react-app.dev/docs/deployment/

---

**Deployment Status**: ✅ Ready for deployment
**Last Updated**: $(date)
