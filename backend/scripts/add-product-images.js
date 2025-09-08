import db from '../config/db.js';

async function addImagesToProducts() {
  try {
    // First, add the image column if it doesn't exist
    const hasImageColumn = await db.schema.hasColumn('products', 'image_url');
    if (!hasImageColumn) {
      await db.schema.table('products', (table) => {
        table.string('image_url').nullable();
      });
      console.log('✅ Added image_url column to products table');
    }

    // Get current products
    const products = await db('products').select('*');
    console.log(`📦 Found ${products.length} products to update`);

    // Product images - using placeholder images that match the product names
    const productImages = {
      'Wireless Headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
      'Smartphone': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center',
      'Laptop': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center',
      'Coffee Mug': 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop&crop=center'
    };

    // Update each product with an image
    for (const product of products) {
      const imageUrl = productImages[product.name] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center';
      
      await db('products')
        .where({ id: product.id })
        .update({ image_url: imageUrl });
      
      console.log(`🖼️  Updated "${product.name}" with image`);
    }

    console.log('✅ All products updated with images successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating products with images:', error);
    process.exit(1);
  }
}

addImagesToProducts();
