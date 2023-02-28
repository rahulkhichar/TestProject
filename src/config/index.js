const { AccessEnv } = require('../common/utility');
const packageJSON = require('../../package.json');

const PACKAGE_VERSION = packageJSON.version;

const ENV = AccessEnv('NODE_ENV');
const BUILD_NUMBER = AccessEnv('BUILD_NUMBER');

const HOST = AccessEnv('HOST');
const HOST_PORT = AccessEnv('HOST_PORT');
const HOST_SERVICE_NAME = AccessEnv('HOST_SERVICE_NAME');

const SQL_DB_HOST = AccessEnv('SQL_DB_HOST');
const SQL_DB_USER = AccessEnv('SQL_DB_USER');
const SQL_DB_PASSWORD = AccessEnv('SQL_DB_PASSWORD');
const SQL_DB_PORT = AccessEnv('SQL_DB_PORT', 5432);
const SQL_DB_NAME = AccessEnv('SQL_DB_NAME');
const SQL_DB_DIALECT = AccessEnv('SQL_DB_DIALECT');

module.exports = {
  packageVersion: PACKAGE_VERSION,
  isTest: ENV === 'test',
  env: ENV,
  node: {
    url: `${HOST}:${HOST_PORT}`,
    pathPrefix: `/${HOST_SERVICE_NAME}/apis`,
    host: HOST,
    port: HOST_PORT,
    serviceName: HOST_SERVICE_NAME,
    buildNumber: BUILD_NUMBER,
  },

  SqlDB: {
    client: 'pg',
    connection: {
      host: SQL_DB_HOST,
      user: SQL_DB_USER,
      port: SQL_DB_PORT,
      password: SQL_DB_PASSWORD,
      dialect: SQL_DB_DIALECT,
      database: SQL_DB_NAME,
      charset: 'utf8mb4',
      timezone: 'UTC',
    },
    debug: true,
    pool: {
      min: 2,
      max: 10,
      idleTimeoutMillis: 30000000,
      createTimeoutMillis: 30000000,
      acquireTimeoutMillis: 30000000,
      propagateCreateError: false,
    },
    migrations: {
      directory: './knex/migrations',
      tableName: 'knex_migrations',
    },
  },
};
