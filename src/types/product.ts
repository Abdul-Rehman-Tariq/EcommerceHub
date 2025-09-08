export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity?: number;
  image_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  image_url?: string;
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data: {
    product: Product;
  };
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: {
    products: Product[];
    count: number;
  };
}