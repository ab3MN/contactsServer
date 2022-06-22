const express = require('express');
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
const router = express.Router();
const jsonParser = express.json();
const uploadUserAvatar = require('../../middlewares/users/uploadUserAvatar');

/* REGISTER LOGIN AUTH LOGOUT */
router.post('/signup', jsonParser, _signUp);

router.post('/login', jsonParser, _login);

router.get('/auth', getUserByToken);
router.get('/auth', _auth);

router.get('/activate/:link', _activate);

router.get('/logout', getUserByToken);
router.get('/logout', _logOut);

/* Avatar Subcription */
router.patch('/avatar', getUserByToken);
router.patch('/avatar', uploadUserAvatar.single('avatar'), _updateAvatar);

router.patch('/subscription', getUserByToken);
router.patch('/subscription', jsonParser, _updateSubscription);

module.exports = router;
