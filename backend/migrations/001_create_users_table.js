export const up = async (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').unique().notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
};

export const down = async (knex) => {
  return knex.schema.dropTable('users');
};
