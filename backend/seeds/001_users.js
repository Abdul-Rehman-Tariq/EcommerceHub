import bcrypt from 'bcrypt';

export const seed = async (knex) => {
  // Security improvement: Check if users already exist to preserve existing passwords
  // This prevents browser security warnings about hardcoded passwords in source code
  const existingAdmin = await knex('users').where('username', 'admin').first();
  const existingUser = await knex('users').where('username', 'testuser').first();

  // Only create users if they don't exist (preserves existing passwords)
  const usersToInsert = [];

  if (!existingAdmin) {
    // Only create admin if environment password is provided
    if (process.env.ADMIN_SEED_PASSWORD) {
      const hashedAdminPassword = await bcrypt.hash(process.env.ADMIN_SEED_PASSWORD, 12);
      usersToInsert.push({
        username: 'admin',
        email: 'admin@example.com',
        password: hashedAdminPassword,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      });
    }
  }

  if (!existingUser) {
    // Only create testuser if environment password is provided
    if (process.env.USER_SEED_PASSWORD) {
      const hashedUserPassword = await bcrypt.hash(process.env.USER_SEED_PASSWORD, 12);
      usersToInsert.push({
        username: 'testuser',
        email: 'test@example.com',
        password: hashedUserPassword,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      });
    }
  }

  // Insert new users if any
  if (usersToInsert.length > 0) {
    await knex('users').insert(usersToInsert);
  }
};
