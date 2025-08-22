/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('activities', (table) => {
        table.string('img'); // This could be a URL or path to the image
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('activities', (table) => {
        table.dropColumn('img'); // This could be a URL or path to the image
      });
};
