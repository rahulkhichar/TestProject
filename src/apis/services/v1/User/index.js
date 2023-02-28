const User = require('@root/src/apis/models/User');

const addUsers = async (data) => {
  try {
    const result = await User.AddUser(data);
    return result;
  } catch (error) {
    return error;
  }
};

const getCount = async (startingAge, endingAge) => {
  try {
    const result = await User.getRecordCount(startingAge, endingAge);
    const [{ count }] = result;
    return parseInt(count, 10);
  } catch (error) {
    return error;
  }
};

module.exports = { addUsers, getCount };
