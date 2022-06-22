const {
  signUp,
  login,
  updateSubscription,
  updateAvatar,
} = require('../services/users/usersService');
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

const _auth = async (req, res, next) => {
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
const _logOut = async (req, res, next) => {
  try {
    if (req.user) {
      require('../services/tokens/tokenService').deleteToken(req.user.id);
      return res.sendStatus(204);
    }
  } catch (e) {
    next(e);
  }
};
const _updateSubscription = async (req, res, next) => {
  try {
    let user;
    if (req.user) {
      user = await updateSubscription(req.user._user.id, req.body.subscription);
    } else if (typeof user === 'string') {
      res.status(401).json({ message: user });
    }
    return res.send(require('../helpers/userDto').userDto(user));
  } catch (e) {
    next(e);
  }
};

const _updateAvatar = async (req, res, next) => {
  try {
    const { path: avatarPath, filename } = req.file;
    const avatarsUrl = await updateAvatar(req.user.id, avatarPath, filename);
    res.send(avatarsUrl);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  _signUp,
  _login,
  _auth,
  _logOut,
  _updateSubscription,
  _updateAvatar,
};
