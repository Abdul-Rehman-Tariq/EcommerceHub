import db from '../config/db.js';

class User {
  static async create(userData) {
    const [user] = await db('users').insert(userData).returning('*');
    return user;
  }

  static async findById(id) {
    return await db('users').where({ id }).first();
  }

  static async findByEmail(email) {
    return await db('users').where({ email }).first();
  }

  static async findByUsername(username) {
    return await db('users').where({ username }).first();
  }

  static async findByEmailOrUsername(identifier) {
    return await db('users')
      .where({ email: identifier })
      .orWhere({ username: identifier })
      .first();
  }

  static async update(id, userData) {
    const [user] = await db('users')
      .where({ id })
      .update(userData)
      .returning('*');
    return user;
  }

  static async delete(id) {
    return await db('users').where({ id }).del();
  }

  static async getAll() {
    return await db('users').select('id', 'username', 'email', 'created_at');
  }
}

export default User;
