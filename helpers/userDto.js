module.exports = {
  userDto: ({ email, subscription, isActivated, _id, role }) => ({
    email,
    id: _id,
    subscription,
    isActivated,
    role,
  }),
};
