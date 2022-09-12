const express = require('express');
const router = express.Router();
const jsonParser = express.json();
const {
  _signUp,
  _login,
  _auth,
  _logOut,
  _updateSubscription,
  _updateUserAvatar,
  _activate,
} = require('../../controllers/usersController');
const { getUserByToken } = require('../../middlewares/users/getUserByToken');
const uploadAvatar = require('../../middlewares/users/uploadAvatar');

/* REGISTER LOGIN AUTH LOGOUT */
router.post('/signup', jsonParser, _signUp);

router.post('/login', jsonParser, _login);

router.get('/auth', getUserByToken);
router.get('/auth', _auth);

router.get('/logout', getUserByToken);
router.get('/logout', _logOut);

router.get('/activate/:link', _activate);

/* Avatar Subcription */
router.patch('/avatar', getUserByToken);
router.patch('/avatar', uploadAvatar, _updateUserAvatar);

router.patch('/subscription', getUserByToken);
router.patch('/subscription', jsonParser, _updateSubscription);

module.exports = router;
