const {
  addBook,
  getBooks,
  // getBookByName,
  updateBookStatus,
} = require('../services/books/booksService');

const _getBooks = async (req, res, next) => {
  try {
    const books = await getBooks(req.user.id);
    res.send(books);
  } catch (e) {
    next(e);
  }
};

const _addBook = async (req, res, next) => {
  try {
    const { filename, originalname } = req.file;
    if (!filename) return res.status(400).json({ mesagge: 'Missing books' });
    const filePath = process.env.API_URL + '/bookFiles/' + filename;

    const _name = originalname.split('.');
    _name.pop();
    const name = _name.join('.');

    // const existBook = await getBookByName(req.user.id, name);
    // if (existBook) {
    //   return res.status(409).json({ message: 'The book already exists' });
    // }

    const book = await addBook(req.user.id, { filePath, name });
    book.save();
    res.send(book);
  } catch (e) {
    next(e);
  }
};

const _updateBookStatus = async (req, res, next) => {
  try {
    const id = req.url.split('/')[1];
    const isCompleted = req.body.isCompleted;
    const owner = req.user.id;

    if (isCompleted !== false && !isCompleted) {
      return res.status(400).json({ message: 'missing field isCompleted' });
    } else if (typeof isCompleted !== 'boolean') {
      return res.status(415).json({ message: 'Wrong type,must be a boolean' });
    }
    const book = await updateBookStatus(owner, id, isCompleted);
    res.send(book);
  } catch (e) {
    next(e);
  }
};

module.exports = { _addBook, _getBooks, _updateBookStatus };
