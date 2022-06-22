const { getUserByEmail } = require('../../services/users/usersService.js');
module.exports = {
  getUserByToken: async (req, res, next) => {
    try {
      const authorization = 'authorization';

      const token =
        (req.headers[authorization] &&
          req.headers[authorization].split(' ')[1]) ||
        req.cookies.token;

      if (!token) res.status(401).json({ message: 'Not authorized' });

      require('jsonwebtoken').verify(
        token,
        process.env.JW_REFRESH_KEY,
        (err, payload) => {
          if (err) return res.status(403).json({ message: 'Bad token' });

          getUserByEmail(payload?.email).then((user) => {
            req.user = require('../../helpers/userDto').userDto(user);
            next();
          });
        }
      );
    } catch (e) {
      next(e);
    }
  },
};
