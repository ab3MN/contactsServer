const express = require('express');
const { _signUp, _login } = require('../../controllers/usersController');
const { getUserByToken } = require('../../middlewares/users/getUserByToken');
const router = express.Router();
const jsonParser = express.json();

router.post('/signup', jsonParser, _signUp);

router.post('/login', jsonParser, getUserByToken);
router.post('/login', jsonParser, _login);

module.exports = router;
