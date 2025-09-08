import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Debug: Log Cloudinary configuration (without exposing secrets)
console.log('🔧 Cloudinary config loaded:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? '***configured***' : 'missing',
  api_secret: process.env.CLOUDINARY_API_SECRET ? '***configured***' : 'missing'
});

// Upload image to Cloudinary
export const uploadImage = async (file, options = {}) => {
  try {
    console.log('🔄 Starting Cloudinary upload for file:', file.path);
    console.log('📁 File details:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path
    });

    const uploadOptions = {
      folder: 'ecommerce/products',
      resource_type: 'image',
      ...options
    };

    console.log('⚙️ Upload options:', uploadOptions);

    const result = await cloudinary.uploader.upload(file.path, uploadOptions);
    
    console.log('✅ Cloudinary upload successful:', {
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height
    });

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format
    };
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error);
    console.error('📋 Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack?.split('\n').slice(0, 3)
    });
    return {
      success: false,
      error: error.message
    };
  }
};

// Delete image from Cloudinary
export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: true,
      result: result.result
    };
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Generate optimized URL
export const getOptimizedUrl = (publicId, options = {}) => {
  const defaultOptions = {
    quality: 'auto',
    format: 'auto',
    crop: 'fill',
    gravity: 'center'
  };

  return cloudinary.url(publicId, { ...defaultOptions, ...options });
};

export default cloudinary;
