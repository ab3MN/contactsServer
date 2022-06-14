const express = require('express');
const {
  _signUp,
  _login,
  _auth,
  _logOut,
} = require('../../controllers/usersController');
const {
  getUserByToken,
  getToken,
} = require('../../middlewares/users/getUserByToken');

const router = express.Router();
const jsonParser = express.json();

router.post('/signup', jsonParser, _signUp);

router.post('/login', jsonParser, _login);

router.get('/auth', getUserByToken);
router.get('/auth', _auth);

router.get('/logout', getToken);
router.get('/logout', _logOut);

module.exports = router;
