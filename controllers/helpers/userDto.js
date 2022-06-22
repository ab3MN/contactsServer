module.exports = {
  userDto: ({
    email,
    subscription,
    isActivated,
    _id,
    role,
    largerAvatarURL,
    smallAvatarURL,
    activationLink,
  }) => ({
    email,
    id: _id,
    subscription,
    isActivated,
    role,
    largerAvatarURL,
    smallAvatarURL,
    activationLink,
  }),
};
