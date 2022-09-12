const {
  getDateBooks,
  getDateBookById,
  addDateBook,
  updateDateBookText,
} = require('../services/dateBooks/dateBooksService');
const { isItADate } = require('../helpers/isItADate');

const _getDateBooks = async (req, res, next) => {
  try {
    const dateBooks = await getDateBooks(req.user.id);
    return res.send(dateBooks);
  } catch (e) {
    next(e);
  }
};

const _getCurrentDateBook = async (req, res, next) => {
  try {
    const dateBook = await getDateBookById(req.user.id, req.params.id);
    res.send(dateBook);
  } catch (e) {
    next(e);
  }
};

const _addDateBook = async (req, res, next) => {
  try {
    if (!req.body.text)
      return res.status(400).json({ message: 'Missing field text' });
    else if (req.body.date && !isItADate(req.body.date))
      return res
        .status(400)
        .json({ message: 'date format is [dd/mm/yyyy,dd-mm-yyyy,dd.mm.yyyy]' });

    const dateBook = await addDateBook(req.user.id, req.body);
    dateBook.save();
    res.send(dateBook);
  } catch (e) {
    next(e);
  }
};

const _updateDateBookText = async (req, res, next) => {
  try {
    if (!req.body.text)
      return res.status(400).json({ message: 'Missing field text' });
    const dateBook = await updateDateBookText(
      req.user.id,
      req.params.id,
      req.body.text
    );
    res.send(dateBook);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  _getDateBooks,
  _getCurrentDateBook,
  _addDateBook,
  _updateDateBookText,
};
