const { Schema, model } = require('mongoose');
const { getCurrentDate } = require('../../helpers/getCurrentDate');

const dateBooksModel = Schema({
  date: {
    type: String,
    default: getCurrentDate(),
  },
  text: {
    type: String,
    require: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = {
  DateBooksModel: model('DateBook', dateBooksModel),
};
