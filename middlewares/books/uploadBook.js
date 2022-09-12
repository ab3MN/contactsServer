const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../../public/bookFiles'));
  },

  filename: function (req, file, cb) {
    cb(null, req.user.id + '_' + file.originalname);
  },

  limits: {
    fileSize: 2048,
  },
});
const types = [
  'application/epub+zip',
  'application/x-mobipocket-ebook',
  'application/vnd.amazon.ebook',
  'application/vnd.amazon.mobi8-ebook',
  'application/pdf',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.documen',
  'application/octet-stream',
  'text/fb2+xml',
  'application/fb2',
  'text/x-sony-bbeb+xml',
  'application/x-sony-bbeb',
  'application/adobe-page-template+xml',
];

const fileFilter = (req, file, cb) =>
  types.includes(file.mimetype) ? cb(null, true) : cb(null, false);

module.exports = multer({ storage, fileFilter }).single('book');
