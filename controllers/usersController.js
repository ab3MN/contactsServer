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
    console.log(req.user);
    if (req.user) {
      return res.send(req.user);
    }
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

module.exports = { _signUp, _login };
