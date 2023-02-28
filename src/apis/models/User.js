const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'user';
  }

  static async AddUser(data) {
    const result = await User.query().insert(data).returning('*');
    return result;
  }

  static async getRecordCount(startingAge, endingAge) {
    const result = await User.query().whereBetween('age', [startingAge, endingAge]).count();
    return result;
  }
}

module.exports = User;
