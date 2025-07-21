/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('rewards', function(table) {
        table.dropColumn('description');
        table.jsonb("sizes") 
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('rewards', function(table) {
        table.dropColumn('sizes');
        table.string('description');
      });
};
