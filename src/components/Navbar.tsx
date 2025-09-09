import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogOut, Package, User, Home, ShoppingCart, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar-glass border-b border-border/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="p-1.5 sm:p-2 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Package className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-white" />
              </div>
              <span className="text-lg sm:text-2xl font-black gradient-text">
                EcommerceHub
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-2">
              <Link 
                to={user ? "/dashboard" : "/"}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300 group"
              >
                <Home className="h-4 w-4 group-hover:text-primary transition-colors" />
                <span>Home</span>
              </Link>
              {(!user || user.role === 'user') && (
                <Link 
                  to="/shop"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300"
                >
                  Shop
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link 
                  to="/admin/products"
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300 group"
                >
                  <Settings className="h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>Manage Products</span>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                {user.role === 'user' && (
                  <Link to="/cart">
                    <Button variant="ghost" size="sm" className="glass-card flex items-center space-x-1 sm:space-x-2 relative px-2 sm:px-4 py-2 rounded-xl hover:bg-white/10">
                      <ShoppingCart className="h-4 w-4" />
                      {cart.itemCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center text-xs p-0 btn-gradient border-0">
                          {cart.itemCount}
                        </Badge>
                      )}
                      <span className="hidden sm:inline">Cart</span>
                    </Button>
                  </Link>
                )}
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="glass-card flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-xl hover:bg-white/10">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">{user.username}</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="glass-card flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-xl hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="glass-card px-3 sm:px-6 py-2 rounded-xl hover:bg-white/10 text-sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="btn-gradient px-3 sm:px-6 py-2 rounded-xl text-sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;