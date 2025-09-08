# 🛍️ EcommerceHub - Full-Stack E-commerce Platform

<div align="center">

![EcommerceHub](https://img.shields.io/badge/EcommerceHub-Full--Stack-blue?style=for-the-badge&logo=react)
![Version](https://img.shields.io/badge/Version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**A modern, secure, and scalable e-commerce platform built with React, Node.js, and PostgreSQL**

[🚀 Live Demo](https://your-app.vercel.app) • [📖 Documentation](#documentation) • [🐛 Report Bug](../../issues) • [✨ Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**EcommerceHub** is a production-ready, full-stack e-commerce platform designed for modern web standards. It provides a complete shopping experience with user authentication, product management, shopping cart functionality, and secure checkout processes.

Built with performance, security, and scalability in mind, this platform demonstrates modern web development best practices and can serve as either a learning resource or a foundation for real-world e-commerce applications.

---

## ✨ Features

### 🛒 **Customer Features**
- **User Registration & Authentication** - Secure account creation and login
- **Product Browsing** - Advanced search and filtering capabilities  
- **Product Details** - Comprehensive product information with image galleries
- **Shopping Cart** - Add, remove, and modify cart items
- **Secure Checkout** - Streamlined checkout process
- **Order History** - Track past purchases and order status
- **Responsive Design** - Seamless experience across all devices

### 👑 **Admin Features**
- **Admin Dashboard** - Comprehensive store management interface
- **Product Management** - Create, update, and delete products
- **Image Upload** - Cloudinary integration for product images
- **Order Management** - View and update order statuses
- **User Management** - Role-based access control
- **Analytics Dashboard** - Sales and performance metrics *(Coming Soon)*

### 🔒 **Security Features**
- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt encryption for user passwords
- **Rate Limiting** - Protection against API abuse
- **CORS Protection** - Cross-origin resource sharing security
- **Input Validation** - Joi-based request validation
- **SQL Injection Prevention** - Knex.js query builder protection

---

## 🛠 Tech Stack

### **Frontend**
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | ^18.3.1 | UI Framework |
| **TypeScript** | ^5.8.3 | Type Safety |
| **Vite** | ^5.4.19 | Build Tool |
| **Tailwind CSS** | ^3.4.17 | Styling Framework |
| **shadcn/ui** | Latest | UI Components |
| **React Router** | ^6.30.1 | Client-side Routing |
| **Axios** | Latest | HTTP Client |

### **Backend**
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | ^18.0.0 | Runtime Environment |
| **Express.js** | ^4.18.2 | Web Framework |
| **PostgreSQL** | ^14.0 | Primary Database |
| **Knex.js** | ^3.0.1 | Query Builder |
| **JWT** | ^9.0.2 | Authentication |
| **bcrypt** | ^5.1.1 | Password Hashing |
| **Cloudinary** | ^2.7.0 | Image Storage |

### **DevOps & Deployment**
| Technology | Purpose |
|-----------|---------|
| **Vercel** | Hosting Platform |
| **GitHub** | Version Control |
| **ESLint** | Code Linting |
| **Prettier** | Code Formatting |

---

## 🏗 Architecture

### **Project Structure**
```
ecommercehub/
├── 📁 src/                    # Frontend source code
│   ├── 📁 components/         # Reusable UI components
│   │   ├── 📁 ui/            # shadcn/ui components
│   │   ├── Navbar.tsx        # Navigation component
│   │   └── ProtectedRoute.tsx # Route protection
│   ├── 📁 pages/             # Route components
│   │   ├── Home.tsx          # Landing page
│   │   ├── Shop.tsx          # Product catalog
│   │   ├── ProductDetails.tsx # Individual product page
│   │   ├── Cart.tsx          # Shopping cart
│   │   ├── Login.tsx         # Authentication
│   │   ├── Register.tsx      # User registration
│   │   ├── Dashboard.tsx     # User dashboard
│   │   └── AdminDashboard.tsx # Admin interface
│   ├── 📁 context/           # State management
│   │   ├── AuthContext.tsx   # Authentication state
│   │   └── CartContext.tsx   # Shopping cart state
│   ├── 📁 hooks/             # Custom React hooks
│   ├── 📁 types/             # TypeScript definitions
│   └── 📁 api/               # API client configuration
├── 📁 api/                  # Vercel serverless functions
├── 📄 vercel.json           # Deployment configuration
└── 📄 package.json          # Dependencies & scripts
```

---

## � Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Cloudinary Account** (for image uploads)

### 1-Minute Setup
```bash
# Clone the repository
git clone <repository-url>
cd ecommercehub

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials

# Create and setup database
createdb ecommercehub_db
npm run migrate
npm run seed

# Start development server
npm run dev
```

**That's it!** Your e-commerce platform is now running at `http://localhost:5173`

---

## 📦 Installation

### Complete Setup Guide

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd ecommercehub
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` file with your configuration:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=ecommercehub_db
   DB_USER=postgres
   DB_PASSWORD=your_password

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=7d

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Server Configuration
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb ecommercehub_db

   # Run migrations
   npm run migrate

   # Add sample data (optional)
   npm run seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

---

## 🌐 Deployment

### Vercel Deployment (Recommended)

This project is optimized for Vercel deployment with serverless functions.

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

3. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   DB_HOST=your_production_db_host
   DB_NAME=your_production_db_name
   DB_USER=your_production_db_user
   DB_PASSWORD=your_production_db_password
   JWT_SECRET=your_production_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Database Setup**
   - Use a managed PostgreSQL service (Supabase, Neon, etc.)
   - Run migrations on your production database

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com", 
  "password": "securepassword123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Product Endpoints

#### Get All Products
```http
GET /api/products
```

#### Create Product (Admin Only)
```http
POST /api/products
Authorization: Bearer <admin_jwt_token>
Content-Type: multipart/form-data

{
  "name": "Product Name",
  "description": "Product description",
  "price": 29.99,
  "category": "Electronics",
  "image": <file>
}
```

---

## 🎯 Default Test Accounts

After running sample data setup:

### Regular User
- **Email:** `user@example.com`
- **Password:** `password123`
- **Role:** user

### Admin User  
- **Email:** `admin@example.com`
- **Password:** `admin123`
- **Role:** admin

---

## 🛠 Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Database  
npm run migrate      # Run database migrations
npm run seed         # Seed database with sample data

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

---

## 🔧 Troubleshooting

### Common Issues

#### Backend Connection Issues
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Test database connection
node backend/test-db.js

# Check environment variables
echo $DB_NAME
```

#### Frontend Build Issues  
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check
```

#### Image Upload Issues
- Verify Cloudinary credentials
- Check network connectivity
- Ensure proper CORS settings

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   npm run type-check
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Areas for Contribution

- 🔍 Search and filtering functionality
- � Payment gateway integration  
- 📊 Analytics dashboard
- 🌍 Internationalization
- 📱 Mobile app development
- 🧪 Test coverage improvement

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### What this means:
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed  
- ✅ Private use allowed
- ❌ No warranty provided
- ❌ No liability accepted

---

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Vercel** - For seamless deployment platform
- **shadcn/ui** - For beautiful UI components
- **Tailwind CSS** - For utility-first CSS framework
- **PostgreSQL** - For robust database management
- **Cloudinary** - For image management services

---

## 📞 Support

Need help? Here are your options:

- 📧 **Email Support:** [support@ecommercehub.dev](mailto:support@ecommercehub.dev)
- 🐛 **Bug Reports:** [GitHub Issues](../../issues)
- 💬 **Discussions:** [GitHub Discussions](../../discussions)
- 📖 **Documentation:** [Full Documentation](./docs/README.md)

---

<div align="center">

**⭐ If you found this project helpful, please consider giving it a star! ⭐**

Made with ❤️ by [Your Name](https://github.com/yourusername)

</div>
