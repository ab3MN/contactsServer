const { signUp, login } = require('../services/users/usersService');
const { userDto } = require('../helpers/userDto');
const {
  generateAccessToken,
  generateRefreshToken,
  saveToken,
} = require('../services/tokens/tokenService');

const getUserWithTokens = async (res, user) => {
  const _user = userDto(user);

  const refreshToken = generateRefreshToken({ _user });
  await saveToken(_user.id, refreshToken);
  res.cookie('token', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
  });
  return {
    user: _user,
    refreshToken,
    accessToken: generateAccessToken({ _user }),
  };
};

const _signUp = async (req, res, next) => {
  try {
    const user = await signUp(req.body);
    user.save();

    const userWithTokens = await getUserWithTokens(res, user);

    return res.send({
      ...userWithTokens,
    });
  } catch (e) {
    if (e._original) {
      return res.status(400).json({ message: e.details[0].message });
    } else if (e.message === 'Email in use')
      return res.status(409).json({ message: 'Email in use' });
    next(e);
  }
};

const _login = async (req, res, next) => {
  try {
    const user = await login(req.body);

    const userWithTokens = await getUserWithTokens(res, user);

    return res.send({
      ...userWithTokens,
    });
  } catch (e) {
    if (e._original) {
      return res.status(400).json({ message: e.details[0].message });
    } else if (e.message === 'Email  is wrong') {
      return res.status(401).json({ message: e.message });
    } else if (e.message === 'Password is wrong') {
      return res.status(401).json({ message: e.message });
    }
    next(e);
  }
};

module.exports = { _signUp, _login };
