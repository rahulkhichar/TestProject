const User = require('@root/src/apis/models/User');

const addUsers = async (data) => {
  try {
    const result = await User.AddUser(data);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { addUsers };
