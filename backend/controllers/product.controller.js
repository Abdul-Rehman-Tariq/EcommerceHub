import Product from '../models/product.model.js';
import { uploadImage, deleteImage } from '../config/cloudinary.js';
import { cleanupTempFile } from '../middleware/upload.middleware.js';

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock_quantity, imageUrl } = req.body;
    let finalImageUrl = imageUrl;

    console.log('📦 Creating product with data:', { name, description, price, stock_quantity, imageUrl });
    console.log('📁 File received:', req.file ? 'Yes' : 'No');

    // Handle image upload to Cloudinary
    if (req.file) {
      console.log('📸 Uploading image to Cloudinary...');
      const uploadResult = await uploadImage(req.file, {
        public_id: `product_${Date.now()}`,
        overwrite: true
      });

      if (uploadResult.success) {
        finalImageUrl = uploadResult.url;
        console.log('✅ Image uploaded successfully:', uploadResult.url);
      } else {
        console.error('❌ Image upload failed:', uploadResult.error);
        // Continue without image but log the error
      }

      // Clean up temporary file
      cleanupTempFile(req.file.path);
    }

    const productData = {
      name,
      description: description || '',
      price: parseFloat(price) || 0,
      stock_quantity: parseInt(stock_quantity) || 0,
      image_url: finalImageUrl
    };

    console.log('💾 Saving product data:', productData);

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    });
  } catch (error) {
    console.error('❌ Error creating product:', error);
    // Clean up temp file if error occurs
    if (req.file) {
      cleanupTempFile(req.file.path);
    }
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const { search, min_price, max_price } = req.query;

    let products;

    if (search) {
      products = await Product.search(search);
    } else if (min_price && max_price) {
      products = await Product.findByPriceRange(
        parseFloat(min_price), 
        parseFloat(max_price)
      );
    } else {
      products = await Product.getAll();
    }

    console.log('📦 Retrieved products:', products.length);
    console.log('🖼️ Sample product image URLs:', products.slice(0, 3).map(p => ({ 
      id: p.id, 
      name: p.name, 
      image_url: p.image_url 
    })));

    res.json({
      success: true,
      message: 'Products retrieved successfully',
      data: { 
        products,
        count: products.length
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product retrieved successfully',
      data: { product }
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock_quantity, imageUrl } = req.body;

    console.log('📝 Updating product with data:', { name, description, price, stock_quantity, imageUrl });
    console.log('📁 File received:', req.file ? 'Yes' : 'No');

    // Check if product exists
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const updates = {
      name,
      description: description || '',
      price: parseFloat(price) || 0,
      stock_quantity: parseInt(stock_quantity) || 0
    };

    // Handle new image upload
    if (req.file) {
      console.log('📸 Uploading new image to Cloudinary...');
      const uploadResult = await uploadImage(req.file, {
        public_id: `product_${id}_${Date.now()}`,
        overwrite: true
      });

      if (uploadResult.success) {
        updates.image_url = uploadResult.url;
        console.log('✅ New image uploaded successfully:', uploadResult.url);
        
        // TODO: Optionally delete old image from Cloudinary if it exists
        // This would require storing the public_id in the database
      } else {
        console.error('❌ Image upload failed:', uploadResult.error);
      }

      // Clean up temporary file
      cleanupTempFile(req.file.path);
    } else if (imageUrl && imageUrl.trim()) {
      // Use provided URL if no file uploaded
      updates.image_url = imageUrl;
    }

    console.log('💾 Updating product with:', updates);

    const product = await Product.update(id, updates);

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });
  } catch (error) {
    // Clean up temp file if error occurs
    if (req.file) {
      cleanupTempFile(req.file.path);
    }
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await Product.delete(id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
