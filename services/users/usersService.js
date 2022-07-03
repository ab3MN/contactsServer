const { UserModel, userValidateSchema } = require('./usersModel');
const { getAvatarPath } = require('../../helpers/getAvatarPath');
const bcrypt = require('bcrypt');

const getUserByEmail = async (email) => await UserModel.findOne({ email });

const signUp = async ({ email, password }, activationLink) => {
  await userValidateSchema.validateAsync({
    password,
    email,
  });
  if (await getUserByEmail(email)) throw new Error('Email in use');

  const _password = await bcrypt.hash(password, 10);
  return new UserModel({ email, password: _password, activationLink });
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
  try {
    await UserModel.findByIdAndUpdate({ _id: id }, { subscription: sub });
    return UserModel.findById(id);
  } catch {
    throw new Error('Update Subscription with some base errors');
  }
};

const updateUserAvatar = async (_id, avatarPath, name) => {
  try {
    const avatarsUrl = getAvatarPath(avatarPath, '/user/avatars/', name);

    await UserModel.findOneAndUpdate(
      { _id },
      { $set: { ...avatarsUrl } },
      { returnDocument: 'after' }
    );
    return avatarsUrl;
  } catch {
    throw new Error('Update Avatar with some base errors');
  }
};
const activate = async (activationLink) => {
  const user = await UserModel.findOne({ activationLink });
  if (!user) {
    return false;
  }
  user.isActivated = true;
  user.activationLink = '';
  await user.save();
  return true;
};
module.exports = {
  signUp,
  getUserByEmail,
  login,
  updateSubscription,
  updateUserAvatar,
  activate,
};
