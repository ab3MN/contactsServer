const {
  getContacts,
  getContactsById,
  addContact,
  updateContact,
  deleteContact,
  updateStatusContactFavorite,
  getContactsByPageAndLimit,
  getContactsByContactStatusFavorite,
  updateContactAvatar,
} = require('../services/contacts/contactsServices');

const _getContacts = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { page, limit, favorite } = req.query;
    if (page && limit) {
      return res.send(await getContactsByPageAndLimit(userId, page, limit));
    } else if (favorite === 'true' || favorite === 'false') {
      return res.send(
        await getContactsByContactStatusFavorite(userId, favorite)
      );
    }
    return res.send(await getContacts(userId));
  } catch (e) {
    next(e);
  }
};

const _getContactsById = async (req, res, next) => {
  try {
    const contact = await getContactsById(req.user.id, req.params.id);
    if (!contact) res.status(404).json({ message: 'Not found' });

    res.send(...contact);
  } catch (e) {
    next(e);
  }
};

const _addContact = async (req, res, next) => {
  try {
    if (!req.body.name)
      return res.status(400).json({ message: 'missing field name' });

    const contact = await addContact(req.user.id, req.body);
    contact.save();
    res.send(contact).status(201);
  } catch (e) {
    next(e);
  }
};

const _deleteContact = async (req, res, next) => {
  try {
    if (!(await getContactsById(req.user.id, req.params.id)))
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

    const contact = await updateContact(req.user.id, req.params.id, {
      ...req.body,
    });

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
    const contact = await updateStatusContactFavorite(
      req.user.id,
      req.params.id,
      req.body.favorite
    );
    res.send({
      message: 'favorite was updated',
      contact,
    });
  } catch (e) {
    next(e);
  }
};

const _updateAvatarContact = async (req, res, next) => {
  try {
    const { path: img, filename } = req.file;
    const contact = await updateContactAvatar(
      req.params.id,
      req.user.id,
      img,
      filename
    );
    res.send(contact);
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
  _updateAvatarContact,
};
