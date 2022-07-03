const { Schema, model } = require('mongoose');

const quoteModel = new Schema({
  text: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
});

module.exports = {
  QuoteModel: model('Quote', quoteModel),
};
