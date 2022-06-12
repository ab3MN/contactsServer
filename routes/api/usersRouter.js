const express = require('express');
const { _auth } = require('../../controllers/usersController');

const router = express.Router();
const jsonParser = express.json();

router.post('/signup', jsonParser, _auth);

module.exports = router;
