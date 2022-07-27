const { DateBooksModel } = require('./dateBooksModel');

const getDateBooks = async (owner) => await DateBooksModel.find({ owner });

const getDateBookById = async (owner, _id) =>
  await DateBooksModel.findOne({ owner, _id });

const addDateBook = async (owner, data) =>
  await new DateBooksModel({ owner, ...data });

const updateDateBookText = async (owner, _id, text) =>
  await DateBooksModel.findOneAndUpdate(
    { owner, _id },
    { $set: { text } },
    { returnDocument: 'after' }
  );

module.exports = {
  getDateBooks,
  getDateBookById,
  addDateBook,
  updateDateBookText,
};
