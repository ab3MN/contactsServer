const express = require('express');
const { _signUp } = require('../../controllers/usersController');

const router = express.Router();
const jsonParser = express.json();

router.post('/signup', jsonParser, _signUp);

module.exports = router;
