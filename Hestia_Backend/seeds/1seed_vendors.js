/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */



exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('reward_redemptions').del();
    await knex('vendors').del();
  
    // Inserts seed entries
    await knex('vendors').insert([
      {
        id: 1,
        business_name: 'Rino Hill Sanctuary',
        first_name: 'Rina',
        last_name: 'Holloway',
        email: 'rina@rinohill.com',
        password: 'hashed_password_2', // Replace with actual hashed value
        reset_token: null,
        reset_token_expires: null,
        img: "Rino.png"
      }
    ]);
  };
  