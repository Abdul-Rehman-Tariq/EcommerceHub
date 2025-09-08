export const up = async (knex) => {
  return knex.schema.table('products', (table) => {
    table.string('image_url').nullable();
  });
};

export const down = async (knex) => {
  return knex.schema.table('products', (table) => {
    table.dropColumn('image_url');
  });
};
