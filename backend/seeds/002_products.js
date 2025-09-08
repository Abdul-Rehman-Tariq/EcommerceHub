export const seed = async (knex) => {
  // Delete existing entries
  await knex('products').del();

  // Insert seed entries
  await knex('products').insert([
    {
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      name: 'Smartphone',
      description: 'Latest smartphone with advanced camera features',
      price: 899.99,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      name: 'Laptop',
      description: 'High-performance laptop for professional work',
      price: 1299.99,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      name: 'Coffee Mug',
      description: 'Ceramic coffee mug with ergonomic design',
      price: 15.99,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      name: 'Backpack',
      description: 'Durable backpack with multiple compartments',
      price: 79.99,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);
};
