const {
  generateAccessToken,
  generateRefreshToken,
  saveToken,
} = require('../../services/tokens/tokenService');

module.exports = {
  getUserWithToken: async (res, user) => {
    const _user = require('../../helpers/userDto').userDto(user);

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
  },
};
