const { TokenModel } = require('./tokensModel.js');

module.exports = {
  generateAccessToken: (payload) =>
    require('jsonwebtoken').sign(payload, process.env.JW_ACCESS_KEY, {
      expiresIn: '30m',
    }),
  generateRefreshToken: (payload) =>
    require('jsonwebtoken').sign(payload, process.env.JW_REFRESH_KEY, {
      expiresIn: '7d',
    }),

  saveToken: async (id, refreshToken) => {
    const tokenData = await TokenModel.findOne({ user: id });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const _token = await new TokenModel({ user: id, refreshToken });
    _token.save();
    return _token;
  },

  deleteToken: async (refreshToken) =>
    await TokenModel.findOneAndDelete({ refreshToken }),
};
