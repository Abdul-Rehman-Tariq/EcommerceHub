export const up = async (knex) => {
  return knex.schema.table('users', (table) => {
    table.string('role').notNullable().defaultTo('user');
  });
};

export const down = async (knex) => {
  return knex.schema.table('users', (table) => {
    table.dropColumn('role');
  });
};
