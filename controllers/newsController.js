const axios = require('axios');
const { getCurrentDate } = require('../helpers/getCurrentDate');
const { v4 } = require('uuid');

const getNews = async (req, res, next) => {
  try {
    const { q } = req.query;
    const currentDate = getCurrentDate().split('.').reverse().join('-');

    const { data } = await axios.get(
      `${process.env.NEWS_URL}?q=${q}&from=${currentDate}&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_KEY}&pageSize=20`
    );
    const articles = [...data.articles.map((el) => ({ id: v4(), ...el }))];

    data.articles.length > 0
      ? res.send(articles)
      : res.status(400).json({ message: 'No news for this querry ' });
  } catch (e) {
    next(e);
  }
};

const getOneNews = async (req, res, next) => {
  try {
    const { title } = req.query;

    const { data } = await axios.get(
      `${process.env.NEWS_URL}?language=en&apiKey=${process.env.NEWS_KEY}&qInTitle=${title}`
    );
    data
      ? res.send(data)
      : res.status(400).json({ message: 'No news for this querry ' });
  } catch (e) {
    next(e);
  }
};

module.exports = { getNews, getOneNews };
