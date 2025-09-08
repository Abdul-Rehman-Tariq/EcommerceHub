# 🚀 Quick Deploy to Vercel

## 1. Install Vercel CLI
```bash
npm i -g vercel
```

## 2. Login to Vercel
```bash
vercel login
```

## 3. Deploy
```bash
vercel
```

## 4. Set Environment Variables in Vercel Dashboard

Go to your project settings and add:
- `DATABASE_URL` - Your PostgreSQL connection string
- `JWT_SECRET` - A secure random string (32+ characters)
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key  
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret
- `NODE_ENV` - Set to `production`

## 5. Run Database Migrations

Set your local `.env` file with the production `DATABASE_URL`, then:
```bash
npm install
npx knex migrate:latest --env production
npx knex seed:run --env production
```

## 6. Redeploy
```bash
vercel --prod
```

That's it! Your app should be live at `https://your-app.vercel.app` 🎉

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
