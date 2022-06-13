const express = require('express');
const { _signUp, _login } = require('../../controllers/usersController');

const router = express.Router();
const jsonParser = express.json();

router.post('/signup', jsonParser, _signUp);
router.post('/login', jsonParser, _login);

module.exports = router;
