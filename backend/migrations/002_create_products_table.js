export const up = async (knex) => {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description');
    table.decimal('price', 10, 2).notNullable();
    table.timestamps(true, true);
  });
};

export const down = async (knex) => {
  return knex.schema.dropTable('products');
};
