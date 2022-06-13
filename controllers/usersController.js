const { signUp, getUserByEmail } = require('../services/users/usersService');
const { userValidateSchema } = require('../services/users/usersModel');
const { userDto } = require('../helpers/userDto');
const {
  generateAccessToken,
  generateRefreshToken,
  saveToken,
} = require('../services/tokens/tokenService');

const _signUp = async (req, res, next) => {
  try {
    if (await getUserByEmail(req.body.email)) {
      return res.status(409).json({ message: 'Email in use' });
    }
    await userValidateSchema.validateAsync({
      password: req.body.password,
      email: req.body.email,
    });

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
    }
    next(e);
  }
};

module.exports = { _signUp };
