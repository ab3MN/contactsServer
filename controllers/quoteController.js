const { getQuote } = require('../services/quote/quoteService');
const { getNumberFromCurrentDate } = require('../helpers/getCurrentDate');

const _getQuote = async (_, res, next) => {
  try {
    const index = getNumberFromCurrentDate();
    const quote = await getQuote(index);
    res.send(quote);
  } catch (e) {
    next(e);
  }
};

module.exports = { _getQuote };
