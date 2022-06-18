const { UserModel, userValidateSchema } = require('./usersModel');
const bcrypt = require('bcrypt');

const getUserByEmail = async (email) => await UserModel.findOne({ email });

const signUp = async ({ email, password }) => {
  await userValidateSchema.validateAsync({
    password,
    email,
  });
  if (await getUserByEmail(email)) throw new Error('Email in use');

  const _password = await bcrypt.hash(password, 10);
  return new UserModel({ email, password: _password });
};

const login = async ({ email, password }) => {
  await userValidateSchema.validateAsync({
    password,
    email,
  });
  const user = await getUserByEmail(email);
  if (!user) throw new Error('Email is wrong');
  else if (!(await bcrypt.compare(password, user.password))) {
    throw new Error('Password is wrong');
  }
  return user;
};
const updateSubscription = async (id, sub = '') => {
  if (sub !== 'starter' && sub !== 'pro' && sub !== 'business') {
    return (
      'Subscription must be [starter,pro,business],your subscription is: ' +
      sub.toUpperCase()
    );
  }
  await UserModel.findByIdAndUpdate({ _id: id }, { subscription: sub });
  return UserModel.findById(id);
};

module.exports = {
  signUp,
  getUserByEmail,
  login,
  updateSubscription,
};
