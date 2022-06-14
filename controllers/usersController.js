const { signUp, login } = require('../services/users/usersService');
const { getUserWithToken } = require('../middlewares/users/getUserWithToken');

const _signUp = async (req, res, next) => {
  try {
    const user = await signUp(req.body);
    user.save();

    const userWithTokens = await getUserWithToken(res, user);

    return res.send({
      ...userWithTokens,
    });
  } catch (e) {
    require('../middlewares/users/usersErrors').userSignUpError(e, res);
    next(e);
  }
};
const _login = async (req, res, next) => {
  try {
    const user = await login(req.body);
    const userWithTokens = await getUserWithToken(res, user);
    return res.send({
      ...userWithTokens,
    });
  } catch (e) {
    require('../middlewares/users/usersErrors').userLoginError(e, res);
    next(e);
  }
};
const _curent = async (req, res, next) => {
  try {
    req.user
      ? res.send(req.user)
      : res.status(401).json({
          message: 'Not authorized',
        });
  } catch (e) {
    next(e);
  }
};
const _auth = async (req, res, next) => {
  try {
    await require('../services/tokens/tokenService').deleteToken(req.token);
    return res.status(204);
  } catch (e) {
    next(e);
  }
};

module.exports = { _signUp, _login, _auth, _curent };
