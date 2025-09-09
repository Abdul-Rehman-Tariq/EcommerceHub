import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Minus, Plus, Trash2, Package, ArrowRight } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Navigate to checkout page (to be implemented)
    navigate('/checkout');
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative text-center max-w-md mx-4">
          <div className="glass-card p-12">
            <ShoppingCart className="h-20 w-20 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Your cart is empty</h2>
            <p className="text-gray-300 mb-8">
              Start shopping to add items to your cart
            </p>
            <Link to="/shop">
              <Button className="btn-gradient hover:scale-[1.02] transition-all duration-200 px-8 py-3">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Shopping Cart
          </h1>
          <p className="text-xl text-gray-300">
            Review your items and proceed to checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">
                Cart Items <span className="text-purple-400">({cart.itemCount})</span>
              </h2>
              <Button
                variant="outline"
                onClick={clearCart}
                className="glass-card border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300"
              >
                Clear Cart
              </Button>
            </div>

            {cart.items.map((item) => (
              <div key={item.id} className="glass-card card-hover">
                <div className="p-6">
                  <div className="flex items-center space-x-6">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {item.product.image_url ? (
                        <img 
                          src={item.product.image_url} 
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <Package className="h-10 w-10 text-purple-400" />
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-xl text-white mb-2">{item.product.name}</h3>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {item.product.description}
                      </p>
                      <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        ${Number(item.product.price).toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="glass-card border-purple-500/30 hover:bg-purple-500/20 text-purple-300 hover:text-white w-10 h-10 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center glass-card border-purple-500/30 bg-gray-900/40 text-white"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="glass-card border-purple-500/30 hover:bg-purple-500/20 text-purple-300 hover:text-white w-10 h-10 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Subtotal and Remove */}
                    <div className="text-right">
                      <p className="font-semibold text-xl text-white mb-2">
                        ${(Number(item.product.price) * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card sticky top-4 p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Order Summary</h3>
                <p className="text-gray-300">
                  Review your order details
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-300">
                    <span>Items ({cart.itemCount})</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t border-purple-500/30 pt-3">
                    <div className="flex justify-between font-semibold text-xl text-white">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        ${cart.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleCheckout}
                  className="w-full btn-gradient hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2 py-3"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>

                {!user && (
                  <p className="text-sm text-gray-300 text-center">
                    Please <Link to="/login" className="text-purple-400 hover:text-purple-300 underline transition-colors">login</Link> to checkout
                  </p>
                )}

                <div className="pt-4 border-t border-purple-500/30">
                  <Link to="/shop">
                    <Button 
                      variant="outline" 
                      className="w-full glass-card border-purple-500/30 hover:bg-purple-500/20 text-purple-300 hover:text-white transition-all duration-300"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;