module.exports = {
  userLoginError: (e, res) =>
    e._original
      ? res.status(400).json({ message: e.details[0].message })
      : res.status(401).json({ message: e.message }),
  userSignUpError: (e, res) =>
    e._original
      ? res.status(400).json({ message: e.details[0].message })
      : res.status(409).json({ message: e.message }),
};
