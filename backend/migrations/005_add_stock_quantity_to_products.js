export const up = async (knex) => {
  return knex.schema.table('products', (table) => {
    table.integer('stock_quantity').defaultTo(0);
  });
};

export const down = async (knex) => {
  return knex.schema.table('products', (table) => {
    table.dropColumn('stock_quantity');
  });
};
