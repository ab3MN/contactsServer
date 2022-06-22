const express = require('express');
const {
  _signUp,
  _login,
  _auth,
  _logOut,
  _updateSubscription,
} = require('../../controllers/usersController');
const { getUserByToken } = require('../../middlewares/users/getUserByToken');
const router = express.Router();
const jsonParser = express.json();

router.post('/signup', jsonParser, _signUp);

router.post('/login', jsonParser, _login);

router.get('/auth', getUserByToken);
router.get('/auth', _auth);

router.get('/logout', getUserByToken);
router.get('/logout', _logOut);

router.patch('/', getUserByToken);
router.patch('/', jsonParser, _updateSubscription);

module.exports = router;
