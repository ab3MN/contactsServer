const { TokenModel } = require('./tokensModel.js');

module.exports = {
  generateAccessToken: (payload) =>
    require('jsonwebtoken').sign(payload, process.env.JW_ACCESS_KEY, {
      expiresIn: '30m',
    }),
  generateRefreshToken: (payload) =>
    require('jsonwebtoken').sign(payload, process.env.JW_REFRESH_KEY, {
      expiresIn: '30d',
    }),

  saveToken: async (id, accessToken) => {
    const tokenData = await TokenModel.findOne({ user: id });
    if (tokenData) {
      tokenData.accessToken = accessToken;
      return tokenData.save();
    }

    const _token = await new TokenModel({ user: id, accessToken });
    _token.save();
    return _token;
  },
  deleteToken: async (id) => await TokenModel.findOneAndDelete({ user: id }),
};
