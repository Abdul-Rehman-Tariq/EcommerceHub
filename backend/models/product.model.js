import db from '../config/db.js';

class Product {
  static async create(productData) {
    const [product] = await db('products').insert(productData).returning('*');
    return product;
  }

  static async findById(id) {
    return await db('products').where({ id }).first();
  }

  static async getAll() {
    return await db('products').orderBy('created_at', 'desc');
  }

  static async update(id, productData) {
    const [product] = await db('products')
      .where({ id })
      .update(productData)
      .returning('*');
    return product;
  }

  static async delete(id) {
    return await db('products').where({ id }).del();
  }

  static async search(searchTerm) {
    return await db('products')
      .where('name', 'ilike', `%${searchTerm}%`)
      .orWhere('description', 'ilike', `%${searchTerm}%`)
      .orderBy('created_at', 'desc');
  }

  static async findByPriceRange(minPrice, maxPrice) {
    return await db('products')
      .whereBetween('price', [minPrice, maxPrice])
      .orderBy('created_at', 'desc');
  }
}

export default Product;
