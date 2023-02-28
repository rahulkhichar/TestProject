/* eslint-disable import/no-unresolved */
const SqlDb = require('@db/SQL');

const init = async () => {
  const dbConnection = new SqlDb();
  dbConnection.connect();

  // Unhandled Rejections and Exceptions process wide
  process
    .on('unhandledRejection', (reason) => {
      console.log({ 'Unhandled Rejection at Promise:': reason });
    })
    .on('uncaughtException', (error) => {
      console.log({ 'Unhandled Rejection at Promise:': error });
      process.exit(1);
    });
};

module.exports = init;
