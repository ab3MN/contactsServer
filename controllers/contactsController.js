const {
  getContacts,
  getContactsById,
  addContact,
  updateContact,
  deleteContact,
  updateStatusContact,
} = require('../services/contacts/contactsServices');

const _getContacts = async (_, res, next) => {
  try {
    res.send(await getContacts());
  } catch (e) {
    next(e);
  }
};

const _getContactsById = async (req, res, next) => {
  try {
    const contact = await getContactsById(req.params.id);
    if (!contact) res.status(404).json({ message: 'Not found' });

    res.send(contact);
  } catch (e) {
    next(e);
  }
};
const _addContact = async (req, res, next) => {
  try {
    if (!req.body.name)
      return res.status(400).json({ message: 'missing field name' });

    const contact = await addContact(req.body).save();
    res.send(contact).status(201);
  } catch (e) {
    next(e);
  }
};
const _deleteContact = async (req, res, next) => {
  try {
    if (!(await getContactsById(req.params.id)))
      return res.status(404).json({ message: 'Not found' });

    await deleteContact(req.params.id);
    res.send({ message: 'contact deleted' });
  } catch (e) {
    next(e);
  }
};

const _updateContact = async (req, res, next) => {
  try {
    if (JSON.stringify(req.body).length === 2)
      return res.status(400).json({ message: 'missing fields' });

    const contact = await updateContact(req.params.id, { ...req.body });

    res.send({
      message: 'Contact was updated',
      contact,
    });
  } catch (e) {
    next(e);
  }
};

const _updateStatusContact = async (req, res, next) => {
  if (typeof req.body.favorite !== 'boolean')
    return res.status(400).json({ message: 'missing field favorite' });

  try {
    const contact = await updateStatusContact(req.params.id, req.body.favorite);
    res.send({
      message: 'favorite was updated',
      contact,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  _getContacts,
  _getContactsById,
  _addContact,
  _updateContact,
  _deleteContact,
  _updateStatusContact,
};
