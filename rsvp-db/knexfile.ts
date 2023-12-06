import config from './config';

export default {
  client: 'pg',
  connection: {
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DB,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'migrations',
  },
};
