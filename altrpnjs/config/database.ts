/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env';
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database';

const databaseConfig: DatabaseConfig = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get('DB_CONNECTION'),

  connections: {
    /*
    |--------------------------------------------------------------------------
    | MySQL config
    |--------------------------------------------------------------------------
    |
    | Configuration for MySQL database. Make sure to install the driver
    | from npm when using this connection
    |
    | npm i mysql
    |
    */
    mysql: {
      client: 'mysql',
      connection: {
        charset: Env.get('DB_CHARSET', 'utf8mb4'),
        host: Env.get('DB_HOST'),
        port: Env.get('DB_PORT'),
        user: Env.get('DB_USERNAME'),
        password: Env.get('DB_PASSWORD', ''),
        database: Env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },

    pg: {
      client: 'pg',
      connection: {
        host: Env.get('PG_DB_HOST'),
        port: Env.get('PG_DB_PORT'),
        user: Env.get('PG_DB_USERNAME'),
        password: Env.get('PG_DB_PASSWORD', ''),
        database: Env.get('PG_DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['./database/pg_migrations'],
      },
      healthCheck: false,
      debug: false,
    },
  },
};

export default databaseConfig;
