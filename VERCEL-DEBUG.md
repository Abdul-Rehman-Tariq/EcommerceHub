# Vercel Deployment Troubleshooting Guide

## Common Issues and Solutions for Blank Page on Vercel

### 1. **Environment Variables Missing**
The most common cause. Add these in Vercel Dashboard → Settings → Environment Variables:

**Required Variables:**
```
NODE_ENV=production
```

**Optional but Recommended:**
```
VITE_API_URL=/api
DB_HOST=your_production_db_host
DB_NAME=your_production_db_name
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### 2. **Build Configuration Issues**
Ensure these files are correct:

**vercel.json:** ✅ Updated with correct routing
**package.json:** ✅ Has correct build script

### 3. **React Router Issues**
- Vercel must route all paths to `/index.html` for SPA routing
- Our vercel.json handles this with the catch-all route

### 4. **API Endpoint Issues**
- API calls might be failing and causing the app to not render
- Check browser dev tools console for errors
- API routes should be accessible at `/api/...`

### 5. **Build Output Issues**
- Ensure `dist/` folder is generated correctly
- Check that `index.html` exists in dist after build

## Debugging Steps:

### Step 1: Check Vercel Function Logs
1. Go to Vercel Dashboard → Functions tab
2. Check for any errors in API functions

### Step 2: Check Browser Console
1. Open deployed site
2. Press F12 → Console tab
3. Look for JavaScript errors

### Step 3: Check Network Tab
1. F12 → Network tab
2. Reload page
3. Look for failed API requests (red entries)

### Step 4: Test Local Build
```bash
npm run build
npm run preview
```

### Step 5: Check Vercel Build Logs
1. Go to Vercel Dashboard → Deployments
2. Click on latest deployment
3. Check build logs for errors

## Quick Fixes to Try:

### Fix 1: Update Environment Variables
Add `NODE_ENV=production` in Vercel settings

### Fix 2: Redeploy
Sometimes a simple redeploy fixes caching issues

### Fix 3: Clear Vercel Cache
In Vercel dashboard, go to Settings → General → Clear Cache

### Fix 4: Check Domain Configuration
Ensure your domain is correctly configured

## Current Status:
- ✅ Added error boundary
- ✅ Added debug logging
- ✅ Updated vercel.json with correct routing
- ✅ Added fallback page for testing
- ⏳ Need to set environment variables in Vercel

## Next Steps:
1. Deploy the updated code
2. Add environment variables in Vercel dashboard
3. Check browser console for any errors
4. Test API endpoints directly: `yoursite.com/api/health`

If none of these work, the issue might be specific to your database connection or missing dependencies.
