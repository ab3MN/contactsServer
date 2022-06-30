const express = require('express');
const router = express.Router();
const jsonParser = express.json();
const {
  _signUp,
  _login,
  _auth,
  _logOut,
  _updateSubscription,
  _updateAvatar,
  _activate,
} = require('../../controllers/usersController');
const { getUserByToken } = require('../../middlewares/users/getUserByToken');
const uploadUserAvatar = require('../../middlewares/users/uploadUserAvatar');

router.use('/', getUserByToken);

/* REGISTER LOGIN AUTH LOGOUT */
router.post('/signup', jsonParser, _signUp);

router.post('/login', jsonParser, _login);

router.get('/auth', _auth);

router.get('/activate/:link', _activate);

router.get('/logout', _logOut);

/* Avatar Subcription */
router.patch('/avatar', uploadUserAvatar.single('avatar'), _updateAvatar);

router.patch('/subscription', jsonParser, _updateSubscription);

module.exports = router;
