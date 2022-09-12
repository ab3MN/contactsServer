const {
  signUp,
  login,
  updateSubscription,
  activate,
  updateUserAvatar,
} = require('../services/users/usersService');
const { getUserWithToken } = require('../middlewares/users/getUserWithToken');
const { sendActivationMail } = require('../services/mail/mailService');

const _signUp = async (req, res, next) => {
  try {
    const activationLink = require('uuid').v4();

    const user = await signUp(req.body, activationLink);

    user.save();

    const userWithTokens = await getUserWithToken(res, user);

    await sendActivationMail(
      req.body.email,
      `${process.env.API_URL}/users/activate/${activationLink}`
    );

    return res.send({
      ...userWithTokens,
    });
  } catch (e) {
    require('../middlewares/users/usersErrors').userSignUpError(e, res);
    next(e);
  }
};
const _activate = async (req, res, next) => {
  try {
    const isActivated = await activate(req.params.link);
    return isActivated
      ? res.redirect(process.env.CLIENT_URL)
      : res.status(404).json({ message: 'User is activated' });
  } catch (e) {}
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
      res.clearCookie('token');
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

const _updateUserAvatar = async (req, res, next) => {
  try {
    const { path: img, filename } = req.file;
    const avatarsUrl = await updateUserAvatar(req.user.id, img, filename);
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
  _updateUserAvatar,
  _activate,
};
