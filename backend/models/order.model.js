import db from '../config/db.js';

class Order {
  static async create(orderData) {
    const [order] = await db('orders').insert(orderData).returning('*');
    return order;
  }

  static async findById(id) {
    return await db('orders')
      .leftJoin('users', 'orders.user_id', 'users.id')
      .select(
        'orders.*',
        'users.username',
        'users.email'
      )
      .where('orders.id', id)
      .first();
  }

  static async getAll(filters = {}) {
    let query = db('orders')
      .leftJoin('users', 'orders.user_id', 'users.id')
      .select(
        'orders.*',
        'users.username',
        'users.email'
      );

    if (filters.status) {
      query = query.where('orders.status', filters.status);
    }

    if (filters.user_id) {
      query = query.where('orders.user_id', filters.user_id);
    }

    return await query.orderBy('orders.created_at', 'desc');
  }

  static async update(id, orderData) {
    const [order] = await db('orders')
      .where({ id })
      .update(orderData)
      .returning('*');
    return order;
  }

  static async delete(id) {
    return await db('orders').where({ id }).del();
  }

  static async getOrdersByUser(userId) {
    return await db('orders')
      .where('user_id', userId)
      .orderBy('created_at', 'desc');
  }

  static async getOrderStats() {
    const totalOrders = await db('orders').count('* as count').first();
    const totalRevenue = await db('orders').sum('total as revenue').first();
    const ordersByStatus = await db('orders')
      .select('status')
      .count('* as count')
      .groupBy('status');

    return {
      totalOrders: totalOrders.count || 0,
      totalRevenue: totalRevenue.revenue || 0,
      ordersByStatus
    };
  }
}

export default Order;
