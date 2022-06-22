const multer = require('multer');
const path = require('path');
const gravatar = require('gravatar');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/avatars'));
  },

  filename: function (req, file, cb) {
    cb(
      null,
      gravatar.url(req.user.email).slice(26) + '.' + file.mimetype.slice(6)
    );
  },

  limits: {
    fileSize: 2048,
  },
});

const types = [
  'apng',
  'avif',
  'gif',
  'jpg',
  'jpeg',
  'jfif',
  'pjpeg',
  'pjp',
  'png',
  'svg',
  'webp',
];

const fileFilter = (req, file, cb) =>
  types.includes(file.mimetype.slice(6)) ? cb(null, true) : cb(null, false);

module.exports = multer({ storage, fileFilter });
