# Deploy to Vercel - Step by Step Guide

## Prerequisites

1. **Database Setup** - You'll need a PostgreSQL database. Recommended options:
   - [Supabase](https://supabase.com) - Free PostgreSQL with 500MB storage
   - [Neon](https://neon.tech) - Serverless PostgreSQL with generous free tier
   - [Aiven](https://aiven.io) - Managed PostgreSQL
   - [ElephantSQL](https://elephantsql.com) - PostgreSQL as a service

2. **Cloudinary Account** - For image uploads
   - Sign up at [Cloudinary](https://cloudinary.com)
   - Get your Cloud Name, API Key, and API Secret

## Deployment Steps

### Step 1: Prepare Your Database

1. Create a PostgreSQL database on your chosen provider
2. Copy the connection string (it should look like: `postgresql://user:password@host:port/database`)
3. Make sure it includes `?sslmode=require` for SSL connection

### Step 2: Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:
   ```bash
   cd "C:\\Users\\Admin\\Downloads\\auth-cart-quest-main\\auth-cart-quest-main"
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project? → No
   - Project name → `ecommercehub` (or your preferred name)
   - Directory → `./` (current directory)
   - Override settings? → No

### Step 3: Configure Environment Variables

After deployment, you need to add environment variables:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

```
DATABASE_URL = postgresql://your-connection-string-here
JWT_SECRET = your-super-secret-jwt-key-here-make-it-long-and-complex
CLOUDINARY_CLOUD_NAME = your-cloudinary-cloud-name
CLOUDINARY_API_KEY = your-cloudinary-api-key
CLOUDINARY_API_SECRET = your-cloudinary-api-secret
NODE_ENV = production
```

### Step 4: Set up Database Schema

You need to run migrations on your production database:

1. **Install dependencies locally**:
   ```bash
   npm install
   ```

2. **Set up your local .env file** with production DATABASE_URL:
   ```bash
   cp .env.example .env
   # Edit .env with your production database URL
   ```

3. **Run migrations**:
   ```bash
   npx knex migrate:latest --env production
   ```

4. **Seed initial data** (optional):
   ```bash
   npx knex seed:run --env production
   ```

### Step 5: Redeploy

After setting environment variables, redeploy to ensure everything is configured:

```bash
vercel --prod
```

## Your App Structure After Deployment

```
your-app.vercel.app/
├── /                    # Frontend (React app)
├── /shop               # Shop page
├── /products/:id       # Product details
├── /cart              # Shopping cart
├── /checkout          # Checkout process
├── /login             # Authentication
├── /register          # User registration
└── /api/              # Backend API endpoints
    ├── /auth          # Authentication endpoints
    ├── /products      # Product management
    └── /orders        # Order management
```

## Testing Your Deployment

1. **Frontend**: Visit `https://your-app.vercel.app`
2. **API Health Check**: Visit `https://your-app.vercel.app/api/health`
3. **Test Registration**: Create a new account
4. **Test Products**: Browse and view product details
5. **Test Cart**: Add products to cart and checkout

## Troubleshooting

### Common Issues:

1. **Database Connection Errors**:
   - Ensure your DATABASE_URL is correct
   - Check that SSL is enabled (`?sslmode=require`)
   - Verify your database allows external connections

2. **API Routes Not Working**:
   - Check that all environment variables are set
   - Verify the API routes in Vercel function logs

3. **Image Upload Issues**:
   - Confirm Cloudinary credentials are correct
   - Check Cloudinary dashboard for upload activity

4. **CORS Errors**:
   - Environment variables should include your Vercel domain
   - Check browser developer console for specific errors

### Vercel Logs:

View function logs in Vercel Dashboard:
1. Go to your project
2. Click **Functions** tab
3. Click on any function to view logs

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db?sslmode=require` |
| `JWT_SECRET` | Secret key for JWT tokens | `super-secret-key-minimum-32-characters-long` |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret | `your-api-secret` |
| `NODE_ENV` | Environment mode | `production` |

## Post-Deployment Checklist

- [ ] Database is accessible and migrations ran successfully
- [ ] Environment variables are configured
- [ ] Frontend loads without errors
- [ ] API endpoints respond (test /api/health)
- [ ] User registration/login works
- [ ] Product browsing works
- [ ] Image uploads work (create a product with image)
- [ ] Cart functionality works
- [ ] All pages are accessible

Your EcommerceHub is now live! 🚀
