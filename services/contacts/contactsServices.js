const { ContactModel } = require('./contactsModel');
const { getAvatarPath } = require('../../helpers/getAvatarPath');

const getContacts = async (owner) => await ContactModel.find({ owner });

const getContactsByPageAndLimit = async (owner, page = 0, limit = 0) => {
  const contacts = await getContacts(owner);
  if (+page === 0 || isNaN(+page) || +limit === 0 || isNaN(+limit)) {
    return contacts;
  }
  return contacts.slice((page - 1) * limit, page * limit);
};
const getContactsById = async (owner, _id) =>
  await ContactModel.find({
    owner,
    _id,
  });

const getContactsByContactStatusFavorite = async (owner, status) => {
  const _status = status === 'true';
  return await ContactModel.find({ owner, favorite: _status });
};

const addContact = async (owner, data) =>
  await new ContactModel({ ...data, owner });

const updateContact = async (owner, _id, data) =>
  await ContactModel.findOneAndUpdate(
    { _id, owner },
    { $set: { ...data } },
    { returnDocument: 'after' }
  );

const deleteContact = async (id) => await ContactModel.findByIdAndDelete(id);

const updateStatusContactFavorite = async (owner, _id, favorite) =>
  await ContactModel.findOneAndUpdate(
    { _id, owner },
    { $set: { favorite } },
    { returnDocument: 'after' }
  );

const updateContactAvatar = async (_id, owner, avatarPath, name) => {
  try {
    const avatarsUrl = await getAvatarPath(
      avatarPath,
      '/contact/avatars/',
      name
    );

    const contact = await ContactModel.findOneAndUpdate(
      { _id, owner },
      { $set: { ...avatarsUrl } },
      { returnDocument: 'after' }
    );

    return contact;
  } catch {
    throw new Error('Update Avatar with some base errors');
  }
};

module.exports = {
  getContacts,
  getContactsById,
  addContact,
  updateContact,
  deleteContact,
  updateStatusContactFavorite,
  getContactsByPageAndLimit,
  getContactsByContactStatusFavorite,
  updateContactAvatar,
};
