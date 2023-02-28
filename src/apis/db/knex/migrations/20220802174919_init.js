/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.string('name').notNullable();
    table.integer('age').notNullable();
    table.string('gender').notNullable();
    table.jsonb('address').nullable();
    table.jsonb('additional_info').nullable();
    table.primary('id');
    table.increments('id');
    table.timestamps(true, true);
  });
};
// orders [ ]

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user');
};
