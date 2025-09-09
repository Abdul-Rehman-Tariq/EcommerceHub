import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Users, Zap, Shield, ArrowRight, CheckCircle } from 'lucide-react';
const Home: React.FC = () => {
  const {
    user
  } = useAuth();
  const features = [{
    icon: <Package className="h-8 w-8" />,
    title: "Product Management",
    description: "Easily create, update, and manage your product catalog with our intuitive interface."
  }, {
    icon: <Users className="h-8 w-8" />,
    title: "User Authentication",
    description: "Secure JWT-based authentication with protected routes and user management."
  }, {
    icon: <Zap className="h-8 w-8" />,
    title: "Fast & Responsive",
    description: "Built with React and TypeScript for optimal performance and type safety."
  }, {
    icon: <Shield className="h-8 w-8" />,
    title: "Secure API",
    description: "Protected endpoints with proper authorization and error handling."
  }];
  const benefits = ["JWT-based secure authentication", "Full CRUD operations for products", "Responsive design for all devices", "Real-time form validation", "Professional UI components", "TypeScript for better development"];
  return <div className="min-h-screen hero-gradient relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-12 sm:py-20 text-center">
        <div className="max-w-6xl mx-auto">
          <Badge variant="secondary" className="mb-6 sm:mb-8 px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium glass-card">
            ✨ Welcome to the Future of E-commerce
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 sm:mb-8 gradient-text leading-tight">
            EcommerceHub
          </h1>
          
          <p className="text-lg sm:text-2xl md:text-3xl text-muted-foreground mb-4 sm:mb-6 max-w-4xl mx-auto leading-relaxed font-light">
            Your <span className="gradient-text font-semibold">complete e-commerce solution</span>
          </p>
          
          <p className="text-sm sm:text-lg text-muted-foreground/80 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
            Shop amazing products or manage your online store with our powerful admin tools. 
            Built for modern businesses with cutting-edge technology.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center items-center">
            {user ? <>
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button size="lg" className="btn-gradient w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg h-auto rounded-2xl">
                    Go to Dashboard
                    <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </Link>
                <Link to="/shop" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="glass-card w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg h-auto rounded-2xl hover:bg-white/10">
                    Browse Products
                    <Package className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </Link>
              </> : <>
                <Link to="/shop" className="w-full sm:w-auto">
                  <Button size="lg" className="btn-gradient w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg h-auto rounded-2xl">
                    Start Shopping
                    <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </Link>
                <Link to="/register" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="glass-card w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg h-auto rounded-2xl hover:bg-white/10">
                    Create Account
                    <Users className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </Link>
              </>}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Why Choose <span className="gradient-text">EcommerceHub</span>?
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
              Powerful features designed to grow your business and delight your customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="product-card p-6 text-center group">
                <CardHeader className="pb-4">
                  <div className="mb-4 inline-flex p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="glass-card p-6 sm:p-12 rounded-3xl text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 gradient-text">Everything You Need to Succeed</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 group text-sm sm:text-base">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-accent transition-colors duration-300 flex-shrink-0" />
                  <span className="text-left">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/20 navbar-glass">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold gradient-text mb-3 sm:mb-4">EcommerceHub</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-md mx-auto px-2">
              Building the future of e-commerce, one store at a time.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <Badge variant="outline" className="glass-card text-xs sm:text-sm">Built with Express</Badge>
              <Badge variant="outline" className="glass-card text-xs sm:text-sm">React + TypeScript</Badge>
              <Badge variant="outline" className="glass-card text-xs sm:text-sm">Modern Design</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
};
export default Home;