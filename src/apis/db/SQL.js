const { Model } = require('objection');

// const { Logger: Log4jLogger } = require('sarvm-utility');
const Knex = require('./knex/knex');

// const Logger = new Log4jLogger();
class SqlDb {
  constructor() {
    if (!SqlDb.instance) {
      SqlDb.instance = this;
    }
  }

  connect() {
    Model.knex(Knex);

    Knex.raw('SELECT 1')
      .then(() => {
        console.log({ msg: 'SQL Connected' });
      })
      .catch((e) => {
        console.log({ msg: e });
      });

    this.Knex = Knex;
  }

  static getInstance() {
    return this.instance;
  }
}

module.exports = SqlDb;
