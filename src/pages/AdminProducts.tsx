import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/api/apiClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Package, Edit, Search, DollarSign, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get('/products');
      setProducts(response.data.data.products);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: number | string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Number(price));
  };

  const handleDeleteProduct = async (productId: number, productName: string) => {
    if (!confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await apiClient.delete(`/products/${productId}`);
      
      // Remove the product from the local state
      setProducts(products.filter(product => product.id !== productId));
      
      toast({
        title: "Success",
        description: `Product "${productName}" has been deleted successfully.`,
      });
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error", 
        description: error.response?.data?.message || "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Products</h1>
            <p className="text-muted-foreground">
              Discover and manage all products in the catalog
            </p>
          </div>
          
          {user && (
            <Link to="/products/new">
              <Button className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </Link>
          )}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="pt-6">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <CardTitle className="mb-2">No products found</CardTitle>
              <CardDescription className="mb-4">
                {searchTerm 
                  ? "No products match your search criteria"
                  : "There are no products in the catalog yet"
                }
              </CardDescription>
              {user && !searchTerm && (
                <Link to="/products/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Product
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{product.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">
                          <span>{formatPrice(product.price)}</span>
                        </Badge>
                      </div>
                    </div>
                    {user && (
                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link to={`/products/${product.id}/edit`}>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteProduct(product.id, product.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Product Image */}
                  <div className="w-full h-32 bg-muted rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Created: {formatDate(product.created_at)}</span>
                    <span>ID: {product.id}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;