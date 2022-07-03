const { QuoteModel } = require('./quoteModel');

const getQuote = async (index) => {
  const quotes = await QuoteModel.find();

  return quotes[index - 1];
};

module.exports = {
  getQuote,
};
