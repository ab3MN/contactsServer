const express = require('express');
const router = express.Router();
const { getNews, getOneNews } = require('../../controllers/newsController');

router.get('/', getNews);
router.get('/oneNews', getOneNews);

module.exports = router;
