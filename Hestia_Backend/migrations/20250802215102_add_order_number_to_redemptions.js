/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * 
 */
exports.up = async function(knex)  {
  await knex.raw('CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1');

  // Step 2: Alter the table to add the new column using the created sequence
  await knex.schema.alterTable('reward_redemptions', function(table) {
    table
      .integer('order_number')
      .notNullable()
      .unique()
      .defaultTo(knex.raw("nextval('order_number_seq')"));
  });
  };
  
  exports.down = async function(knex) {
    // Drop the column first
    await knex.schema.alterTable('reward_redemptions', function(table) {
      table.dropColumn('order_number');
    });
  
    // Then drop the sequence
    await knex.raw('DROP SEQUENCE IF EXISTS order_number_seq');
  };
  