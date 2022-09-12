const {
  generateAccessToken,
  generateRefreshToken,
  saveToken,
} = require('../../services/tokens/tokenService');

module.exports = {
  getUserWithToken: async (res, user) => {
    const accessToken = generateAccessToken({ email: user.email });
    const refreshToken = generateRefreshToken({ email: user.email });
    res.cookie('token', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    await saveToken(user.id, accessToken);

    return {
      user: require('../../helpers/userDto').userDto(user),
      accessToken,
      refreshToken,
    };
  },
};
