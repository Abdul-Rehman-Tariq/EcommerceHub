import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';
import apiClient from '@/api/apiClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Search, Package, Filter, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  const fetchProducts = async () => {
    try {
      console.log('🛒 Fetching products...');
      const response = await apiClient.get('/products');
      console.log('📦 Products response:', response.data);
      console.log('🔍 Products array:', response.data.data.products);
      
      // Safety check to ensure we have an array
      const productsArray = response.data.data.products || [];
      
      // Debug: Check image URLs specifically
      console.log('🖼️ Products with image URLs:', productsArray.map(p => ({
        id: p.id,
        name: p.name,
        image_url: p.image_url,
        hasImage: !!p.image_url
      })));
      
      setProducts(productsArray);
    } catch (error: any) {
      console.error('❌ Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const formatPrice = (price: number | string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Number(price));
  };  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Shop Collection
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover amazing products and add them to your cart
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-card border-purple-500/30 focus:border-purple-400/50 bg-gray-900/40 text-white placeholder:text-gray-400"
            />
          </div>
          <Button 
            variant="outline" 
            className="glass-card border-purple-500/30 hover:bg-purple-500/20 text-purple-300 hover:text-white transition-all duration-300 flex items-center space-x-2" 
            disabled
          >
            <Filter className="h-4 w-4" />
            <span>Filters (Soon)</span>
          </Button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="glass-card p-12 max-w-md mx-auto">
              <Package className="h-16 w-16 text-purple-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4 text-white">No products found</h3>
              <p className="text-gray-300">
                {searchTerm ? 'Try adjusting your search terms' : 'No products available at the moment'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="glass-card group card-hover">
                <div className="p-6">
                  <div 
                    className="aspect-square bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl mb-6 overflow-hidden cursor-pointer relative"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-16 w-16 text-purple-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                      In Stock
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={() => navigate(`/products/${product.id}`)}
                      variant="outline"
                      className="w-full glass-card border-purple-500/30 hover:bg-purple-500/20 text-purple-300 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </Button>
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full btn-gradient hover:scale-[1.02] transition-transform duration-200 flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Summary */}
        {filteredProducts.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-300 text-lg">
              Showing <span className="text-purple-400 font-semibold">{filteredProducts.length}</span> of <span className="text-purple-400 font-semibold">{products.length}</span> products
              {searchTerm && <span className="text-pink-400"> for "{searchTerm}"</span>}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;