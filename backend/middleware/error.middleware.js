export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Default error
  let error = {
    success: false,
    message: err.message || 'Server Error',
    statusCode: err.statusCode || 500
  };

  // Validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = {
      success: false,
      message: 'Validation Error',
      errors: message,
      statusCode: 400
    };
  }

  // Duplicate key error
  if (err.code === '23505') {
    const field = err.detail.match(/Key \((.+?)\)=/)?.[1] || 'field';
    error = {
      success: false,
      message: `Duplicate ${field}. Please use a different value.`,
      statusCode: 400
    };
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    error = {
      success: false,
      message: 'Invalid token',
      statusCode: 401
    };
  }

  // JWT expired error
  if (err.name === 'TokenExpiredError') {
    error = {
      success: false,
      message: 'Token expired',
      statusCode: 401
    };
  }

  res.status(error.statusCode).json(error);
};

export const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};
