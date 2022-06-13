const { UserModel } = require('./usersModel');
const bcrypt = require('bcrypt');

const getUserByEmail = (email) => UserModel.findOne({ email });

const signUp = async ({ email, password }) => {
  try {
    const _password = await bcrypt.hash(password, 10);
    return new UserModel({ email, password: _password });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  signUp,
  getUserByEmail,
};
