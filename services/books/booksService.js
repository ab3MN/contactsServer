const { BookModel } = require('./booksModel');

const getBooks = async (owner) => await BookModel.find({ owner });

const addBook = async (owner, data) => await new BookModel({ owner, ...data });

const getBookByName = async (owner, name) =>
  await BookModel.find({ owner, name });

const updateBookStatus = async (owner, _id, isCompleted) =>
  await BookModel.findOneAndUpdate(
    { _id, owner },
    { $set: { isCompleted } },
    { returnDocument: 'after' }
  );

module.exports = { addBook, getBooks, getBookByName, updateBookStatus };
