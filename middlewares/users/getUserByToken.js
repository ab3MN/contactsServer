module.exports = {
  getUserByToken: (req, res, next) => {
    try {
      const authorization = 'authorization';
      const token =
        req.headers[authorization] && req.headers[authorization].split(' ')[1];
      if (!token) return res.starus(401).json({ message: 'Not authorized' });
      const user = require('jsonwebtoken').verify(
        token,
        process.env.JW_REFRESH_KEY
      );
      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  },
};
