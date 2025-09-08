import bcrypt from 'bcrypt';

export const seed = async (knex) => {
  // Delete existing entries
  await knex('users').del();

  // Hash password for demo user
  const hashedPassword = await bcrypt.hash('password123', 12);

  // Insert seed entries
  await knex('users').insert([
    {
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      username: 'testuser',
      email: 'test@example.com',
      password: hashedPassword,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);
};
