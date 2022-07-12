const express = require('express');
const { getUserByToken } = require('../../middlewares/users/getUserByToken');
const { _getBooks, _addBook } = require('../../controllers/booksController');
const uploadBook = require('../../middlewares/books/uploadBook');

const router = express.Router();
// const jsonParser = express.json();

router.use('/', getUserByToken);

router.get('/', _getBooks);
router.post('/', uploadBook, _addBook);

module.exports = router;
