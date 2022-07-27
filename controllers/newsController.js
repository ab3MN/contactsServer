const axios = require('axios');
const { getCurrentDate } = require('../helpers/getCurrentDate');

const getNews = async (req, res, next) => {
  try {
    const { q } = req.body;
    const currentDate = getCurrentDate().split('.').reverse().join('-');

    const { data } = await axios.get(
      `${process.env.NEWS_URL}?q=${q}&from=${currentDate}&sortBy=publishedAt&apiKey=${process.env.NEWS_KEY}`
    );
    data.articles.length > 0
      ? res.send(data.articles)
      : res.status(400).json({ message: 'No news for this querry ' });
  } catch (e) {
    next(e);
  }
};

module.exports = { getNews };
