# Auth Cart Quest - Full Stack Web Application

A complete full-stack authentication and product management system built with modern web technologies.

## 🏗 Tech Stack

### Backend
- **Node.js** + **Express.js** - RESTful API server
- **PostgreSQL** - Database with SQL migrations
- **JWT** - Secure authentication
- **bcrypt** - Password hashing
- **Knex.js** - SQL query builder and migrations
- **Joi** - Input validation

### Frontend
- **React** + **TypeScript** - Modern UI framework
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **Context API** - State management

## 🚀 Features

- 🔐 **Secure Authentication** - JWT-based login/register
- 👤 **User Management** - Profile management
- 🛍️ **Product CRUD** - Create, read, update, delete products
- 🛒 **Shopping Cart** - Add/remove items, manage quantities
- 📱 **Responsive Design** - Mobile-first approach
- 🔒 **Protected Routes** - Auth-based access control
- ✅ **Form Validation** - Client and server-side validation
- 🎨 **Modern UI** - Clean, professional interface

## 📁 Project Structure

```
auth-cart-quest/
├── src/                     # React + TypeScript frontend
│   ├── components/         # Reusable UI components
│   ├── pages/             # Route components
│   ├── context/           # React Context (Auth, Cart)
│   ├── types/             # TypeScript type definitions
│   ├── api/               # API client configuration
│   └── lib/               # Utilities
│
└── backend/               # Node.js + Express API
    ├── config/           # Database configuration
    ├── controllers/      # Route handlers
    ├── middleware/       # Auth, validation, error handling
    ├── models/           # Database models
    ├── routes/           # API routes
    ├── migrations/       # Database migrations
    ├── seeds/            # Sample data
    └── package.json
```

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn
- PostgreSQL (v12+)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd auth-cart-quest-main
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Create PostgreSQL database
createdb auth_cart_db

# Run database migrations
npm run migrate

# (Optional) Add sample data
npm run seed

# Start the development server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:8080`

## 🗄 Database Setup

### Quick Setup with Default Settings:
1. Install PostgreSQL with default settings
2. Create database: `createdb auth_cart_db`  
3. Update backend `.env` file with your credentials
4. Run: `npm run migrate` (in backend directory)
5. Run: `npm run seed` (optional, for sample data)

### Detailed Setup:
See `backend/DATABASE_SETUP.md` for comprehensive database setup instructions.

## 🔧 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=auth_cart_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:8080
```

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile (protected)

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `POST /products` - Create product (protected)
- `PUT /products/:id` - Update product (protected)
- `DELETE /products/:id` - Delete product (protected)

### Health Check
- `GET /health` - Server health status

## 🧪 Testing

### Test API with Postman
Import `backend/postman_collection.json` into Postman for ready-to-use API tests.

### Test Database Connection
```bash
cd backend
node test-db.js
```

## 🔐 Authentication Flow

1. **Register/Login** → User receives JWT token
2. **Token Storage** → Frontend stores token in localStorage
3. **API Requests** → Token sent in Authorization header
4. **Protected Routes** → Backend validates token for restricted endpoints

## 🎨 Frontend Features

- **Modern UI** - Built with Tailwind CSS and shadcn/ui
- **Responsive Design** - Mobile-first approach
- **Dark/Light Mode** - Theme switching support
- **Form Validation** - Real-time validation with error handling
- **Loading States** - Smooth user experience with loading indicators
- **Toast Notifications** - User feedback for all actions

## 🛡 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **Input Validation** - Server-side validation with Joi
- **CORS Protection** - Configured for frontend domain
- **Rate Limiting** - API request throttling
- **Helmet.js** - Security headers

## 🔄 Development Scripts

### Backend
```bash
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
npm run migrate      # Run database migrations
npm run seed         # Run database seeds
npm run migrate:rollback  # Rollback last migration
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📦 Deployment

### Backend Deployment
1. Set environment variables for production
2. Set `NODE_ENV=production`
3. Configure production database
4. Run migrations: `npm run migrate`
5. Start server: `npm start`

### Frontend Deployment
1. Build project: `npm run build`
2. Deploy `dist/` folder to static hosting (Vercel, Netlify, etc.)
3. Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues:

**Backend won't start:**
- Check PostgreSQL is running
- Verify database credentials in `.env`
- Ensure database exists

**Frontend can't connect to backend:**
- Check backend server is running on port 5000
- Verify CORS settings
- Check API base URL in frontend

**Database connection fails:**
- Run `node test-db.js` in backend directory
- Check PostgreSQL service status
- Verify database name and credentials

### Getting Help:

1. Check the `backend/DATABASE_SETUP.md` for database issues
2. Review server logs in terminal
3. Check browser network tab for API errors
4. Verify all environment variables are set correctly

---

## 🎯 Demo Credentials

The following demo accounts are available in the seeded database:

**Admin User:**
- Email: `admin@example.com`
- Username: `admin` 
- Password: `password123`

**Test User:**
- Email: `test@example.com` 
- Username: `testuser`
- Password: `password123`

> **Note:** These are demo credentials for development/testing purposes only. The seed file has been updated to preserve existing users and passwords, so these accounts will continue to work with their original passwords.

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b455d147-b38e-49d4-8d4a-12fe49ed88c2) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
