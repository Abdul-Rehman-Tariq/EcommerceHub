export async function seed(knex) {
  // Clear existing orders
  await knex('orders').del();

  // Insert sample orders
  await knex('orders').insert([
    {
      id: 1,
      user_id: 1, // admin user
      total: 129.99,
      status: 'delivered',
      items: JSON.stringify([
        { name: 'Wireless Headphones', quantity: 1, price: 79.99 },
        { name: 'Phone Case', quantity: 2, price: 25.00 }
      ]),
      shipping_address: '123 Main St, City, State 12345',
      billing_address: '123 Main St, City, State 12345',
      payment_method: 'credit_card',
      created_at: new Date('2024-01-15'),
      updated_at: new Date('2024-01-15')
    },
    {
      id: 2,
      user_id: 2, // regular user
      total: 59.99,
      status: 'shipped',
      items: JSON.stringify([
        { name: 'Bluetooth Speaker', quantity: 1, price: 59.99 }
      ]),
      shipping_address: '456 Oak Ave, Town, State 67890',
      billing_address: '456 Oak Ave, Town, State 67890',
      payment_method: 'paypal',
      created_at: new Date('2024-01-18'),
      updated_at: new Date('2024-01-18')
    },
    {
      id: 3,
      user_id: 1, // admin user
      total: 199.98,
      status: 'processing',
      items: JSON.stringify([
        { name: 'Laptop Stand', quantity: 1, price: 89.99 },
        { name: 'Wireless Mouse', quantity: 1, price: 49.99 },
        { name: 'USB Cable', quantity: 2, price: 29.99 }
      ]),
      shipping_address: '123 Main St, City, State 12345',
      billing_address: '123 Main St, City, State 12345',
      payment_method: 'credit_card',
      created_at: new Date('2024-01-20'),
      updated_at: new Date('2024-01-20')
    },
    {
      id: 4,
      user_id: 3, // another user
      total: 35.99,
      status: 'pending',
      items: JSON.stringify([
        { name: 'Screen Cleaner Kit', quantity: 1, price: 15.99 },
        { name: 'Cable Organizer', quantity: 1, price: 19.99 }
      ]),
      shipping_address: '789 Pine Rd, Village, State 54321',
      billing_address: '789 Pine Rd, Village, State 54321',
      payment_method: 'credit_card',
      created_at: new Date('2024-01-22'),
      updated_at: new Date('2024-01-22')
    }
  ]);

  console.log('✅ Orders seeded successfully!');
}
