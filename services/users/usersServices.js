const { User } = require('./usersModel');
const bcrypt = require('bcrypt');

const getUserByEmail = (email) => User.findOne({ email });

const auth = ({ email, password }) => new User({ email, password });

module.exports = {
  auth,
  getUserByEmail,
};
