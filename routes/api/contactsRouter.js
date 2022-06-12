const express = require('express');
const {
  _getContacts,
  _getContactsById,
  _addContact,
  _updateContact,
  _deleteContact,
  _updateStatusContact,
} = require('../../controllers/contactsController.js');

const router = express.Router();
const jsonParser = express.json();

router.get('/', _getContacts);

router.get('/:id', _getContactsById);

router.post('/', jsonParser, _addContact);

router.put('/:id', jsonParser, _updateContact, _getContactsById);

router.delete('/:id', _deleteContact);

router.patch('/:id/favorite', _updateStatusContact);

module.exports = router;
