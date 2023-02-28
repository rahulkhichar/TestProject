const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'user';
  }

  static async AddUser(data) {
    console.log(data);
    const result = await User.query().insert(data).returning('*');
    console.log(result);
    return result;
  }
}

module.exports = User;
