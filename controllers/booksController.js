const _getBooks = async (req, res, next) => {};

const _addBook = async (req, res, next) => {
  try {
    console.log(req.file);
  } catch (e) {
    next(e);
  }
};

module.exports = { _addBook, _getBooks };
