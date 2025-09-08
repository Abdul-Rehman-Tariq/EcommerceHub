import Joi from 'joi';

export const validateRegister = (req, res, next) => {
  console.log('🔍 Validating registration data:', req.body);
  
  const schema = Joi.object({
    username: Joi.string().pattern(/^[a-zA-Z0-9_-]+$/).min(3).max(30).required().messages({
      'string.pattern.base': 'Username can only contain letters, numbers, underscores, and hyphens'
    }),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    console.log('❌ Validation failed:', error.details.map(detail => detail.message));
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  console.log('✅ Validation passed');
  next();
};

export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    identifier: Joi.string().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

export const validateProduct = (req, res, next) => {
  console.log('🔍 Validating product data:', req.body);
  
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    description: Joi.string().allow(''),
    price: Joi.number().positive().precision(2).required(),
    stock_quantity: Joi.number().integer().min(0).default(0),
    imageUrl: Joi.string().uri().allow('').optional()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    console.log('❌ Product validation failed:', error.details.map(detail => detail.message));
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  console.log('✅ Product validation passed');
  next();
};

export const validateProductUpdate = (req, res, next) => {
  console.log('🔍 Validating product update data:', req.body);
  
  const schema = Joi.object({
    name: Joi.string().min(1).max(255),
    description: Joi.string().allow(''),
    price: Joi.number().positive().precision(2),
    stock_quantity: Joi.number().integer().min(0),
    imageUrl: Joi.string().uri().allow('').optional()
  }).min(1); // At least one field is required

  const { error } = schema.validate(req.body);
  if (error) {
    console.log('❌ Product update validation failed:', error.details.map(detail => detail.message));
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  console.log('✅ Product update validation passed');
  next();
};
