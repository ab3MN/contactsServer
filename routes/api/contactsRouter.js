const express = require('express');
const {
  _getContacts,
  _getContactsById,
  _addContact,
  _updateContact,
  _deleteContact,
  _updateStatusContact,
  _updateAvatarContact,
} = require('../../controllers/contactsController.js');
const { getUserByToken } = require('../../middlewares/users/getUserByToken');
const uploadAvatar = require('../../middlewares/users/uploadAvatar');

const router = express.Router();
const jsonParser = express.json();

router.use('/', getUserByToken);
router.get('/', _getContacts);

router.get('/:id', _getContactsById);

router.post('/', jsonParser, _addContact);

router.put('/:id', jsonParser, _updateContact);

router.delete('/:id', _deleteContact);

router.patch('/:id/favorite', _updateStatusContact);

router.patch('/:id/avatar', uploadAvatar, _updateAvatarContact);

module.exports = router;
