const express = require('express');
const { getUserByToken } = require('../../middlewares/users/getUserByToken');
const {
  _getDateBooks,
  _getCurrentDateBook,
  _addDateBook,
  _updateDateBookText,
} = require('../../controllers/dateBooksController');

const router = express.Router();
const jsonParser = express.json();

router.use('/', getUserByToken);

router.get('/', _getDateBooks);

router.get('/:id', _getCurrentDateBook);

router.post('/', jsonParser, _addDateBook);

router.patch('/:id', jsonParser, _updateDateBookText);

module.exports = router;
