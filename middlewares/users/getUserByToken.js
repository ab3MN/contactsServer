const { getUserByEmail } = require('../../services/users/usersService.js');
module.exports = {
  getUserByToken: async (req, res, next) => {
    try {
      const authorization = 'authorization';

      const token =
        (req.headers[authorization] &&
          req.headers[authorization].split(' ')[1]) ||
        req.cookies.token;

      if (!token) return res.starus(401).json({ message: 'Not authorized' });
      const payload = require('jsonwebtoken').verify(
        token,
        process.env.JW_REFRESH_KEY
      );
      const user = await getUserByEmail(payload.email);

      req.user = require('../../helpers/userDto').userDto(user);
      next();
    } catch (e) {
      next(e);
    }
  },
};
