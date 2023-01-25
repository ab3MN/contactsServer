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
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
  'image/gif',
  'image/vnd.mozilla.apng',
  'image/avif',
  'image/pjpeg',
  'image/x-citrix-jpeg',
  'image/jp2',
  'image/jpx',
  'image/jpm',
];

const fileFilter = (req, file, cb) =>
  types.includes(file.mimetype) ? cb(null, true) : cb(null, false);

module.exports = multer({ storage, fileFilter }).single('avatar');
