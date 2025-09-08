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
  return <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            EcommerceHub
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Your complete e-commerce solution. Shop amazing products or manage your online store 
            with our powerful admin tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? <>
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button variant="outline" size="lg">
                    Browse Products
                  </Button>
                </Link>
              </> : <>
                <Link to="/shop">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                    Start Shopping
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg">
                    Create Account
                  </Button>
                </Link>
              </>}
          </div>
        </div>
      </section>

      {/* Features Section */}
      

      {/* Footer */}
      <footer className="border-t bg-background/50 backdrop-blur-sm">
        
      </footer>
    </div>
};
export default Home;