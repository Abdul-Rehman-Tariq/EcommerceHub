import Order from '../models/order.model.js';

export const createOrder = async (req, res, next) => {
  try {
    const { items, shipping_address, billing_address, payment_method } = req.body;
    const userId = req.user.id;

    // Calculate total from items
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const orderData = {
      user_id: userId,
      total,
      items: JSON.stringify(items),
      shipping_address,
      billing_address,
      payment_method,
      status: 'pending'
    };

    const order = await Order.create(orderData);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { order }
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const { status, user_id } = req.query;
    
    const filters = {};
    if (status) filters.status = status;
    if (user_id) filters.user_id = user_id;

    const orders = await Order.getAll(filters);

    // Parse items JSON for each order
    const ordersWithParsedItems = orders.map(order => ({
      ...order,
      items: order.items ? JSON.parse(order.items) : []
    }));

    res.json({
      success: true,
      message: 'Orders retrieved successfully',
      data: { 
        orders: ordersWithParsedItems,
        count: ordersWithParsedItems.length
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Parse items JSON
    order.items = order.items ? JSON.parse(order.items) : [];

    res.json({
      success: true,
      message: 'Order retrieved successfully',
      data: { order }
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      });
    }

    const order = await Order.update(id, { status });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: { order }
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderStats = async (req, res, next) => {
  try {
    const stats = await Order.getOrderStats();

    res.json({
      success: true,
      message: 'Order statistics retrieved successfully',
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await Order.getOrdersByUser(userId);

    // Parse items JSON for each order
    const ordersWithParsedItems = orders.map(order => ({
      ...order,
      items: order.items ? JSON.parse(order.items) : []
    }));

    res.json({
      success: true,
      message: 'User orders retrieved successfully',
      data: { 
        orders: ordersWithParsedItems,
        count: ordersWithParsedItems.length
      }
    });
  } catch (error) {
    next(error);
  }
};
