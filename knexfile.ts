import { Config } from 'knex';

const config: Config = {
  client: 'sqlite3',
  connection: {
    filename: './faker-server-graphql.db',
    timezone: 'UTC'
  },
  useNullAsDefault: true,
  migrations: {
    directory: './src/db/migrations'
  },
  seeds: {
    directory: './src/db/seeds'
  }
};

export default config; // For application use
module.exports = config; // For CLI use
