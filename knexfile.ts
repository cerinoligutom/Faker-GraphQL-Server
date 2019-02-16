import { Config } from 'knex';

export const config: Config = {
  client: 'sqlite3',
  connection: {
    filename: './faker-server-graphql.db'
  },
  useNullAsDefault: true,
  migrations: {
    directory: './src/db/migrations'
  },
  seeds: {
    directory: './src/db/seeds'
  }
};

export default config;
