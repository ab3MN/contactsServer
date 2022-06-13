const {
  signUp,
  login,
  getUserByEmail,
} = require('../services/users/usersService');
const { userDto } = require('../helpers/userDto');
const {
  generateAccessToken,
  generateRefreshToken,
  saveToken,
} = require('../services/tokens/tokenService');

const _signUp = async (req, res, next) => {
  try {
    const user = await signUp(req.body);
    const _user = userDto(user);
    user.save();

    const refreshToken = generateRefreshToken({ _user });
    await saveToken(user._id, refreshToken);
    res.cookie('token', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    return res.send({
      user: _user,
      accessToken: generateAccessToken({ _user }),
      refreshToken,
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
    await login(req.body);
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
