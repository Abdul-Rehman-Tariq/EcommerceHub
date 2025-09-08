export const up = async (knex) => {
  return knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.decimal('total', 10, 2).notNullable();
    table.string('status').defaultTo('pending'); // pending, processing, shipped, delivered, cancelled
    table.json('items'); // Store cart items as JSON
    table.text('shipping_address');
    table.text('billing_address');
    table.string('payment_method');
    table.timestamps(true, true);
  });
};

export const down = async (knex) => {
  return knex.schema.dropTable('orders');
};
