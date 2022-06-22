const { UserModel, userValidateSchema } = require('./usersModel');
const bcrypt = require('bcrypt');
const Jimp = require('jimp');
const path = require('path');

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
  try {
    await UserModel.findByIdAndUpdate({ _id: id }, { subscription: sub });
    return UserModel.findById(id);
  } catch {
    throw new Error('Update Subscription with some base errors');
  }
};

const updateAvatar = async (_id, avatarPath, name) => {
  try {
    const img = await Jimp.read(avatarPath);
    img
      .resize(250, 250)
      .quality(60)
      .write(path.join(__dirname, '../../public/avatars/') + 'Large_' + name);
    img
      .resize(80, 80)
      .quality(60)
      .write(path.join(__dirname, '../../public/avatars/') + 'Small_' + name);

    const avatarsUrl = {
      largerAvatarURL: '/avatars' + '/Large_' + name,
      smallAvatarURL: '/avatars' + '/Small_' + name,
    };
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
module.exports = {
  signUp,
  getUserByEmail,
  login,
  updateSubscription,
  updateAvatar,
};
