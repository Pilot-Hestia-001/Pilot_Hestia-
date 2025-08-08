// Update with your config settings.
require('dotenv').config()
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
  
  migrations: {
    directory: './migrations' 
  },

  seeds: {
    directory: './seeds'
  },

  migrations: {
    directory: './migrations' 
  },
  seeds: {
    directory: './seeds'
  }
},

  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL, // Render will set this
      ssl: { rejectUnauthorized: false } // required for Render
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }


};
