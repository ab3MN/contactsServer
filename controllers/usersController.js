const {
  auth,
  //   userValidateSchema,
  //   getUserByEmail,
} = require('../services/users/usersServices');

const _auth = async (req, res, next) => {
  try {
    const user = await auth(req.body).save();
    return res.send(user);
  } catch (e) {
    next(e);
  }
};

module.exports = { _auth };
