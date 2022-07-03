const express = require('express');
const { _getQuote } = require('../../controllers/quoteController');

const router = express.Router();

router.get('/', _getQuote);

module.exports = router;
