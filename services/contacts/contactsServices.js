const { ContactModel } = require('./contactsModel');
// const { getAvatarPath } = require('../../helpers/getAvatarPath');
const Jimp = require('jimp');
const path = require('path');

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

const updateContactAvatar = async (_id, avatarPath, name) => {
  try {
    const img = await Jimp.read(avatarPath);
    img
      .resize(250, 250)
      .quality(60)
      .write(
        path.join(__dirname, '../../public/contact/avatars/') + 'Large_' + name
      );
    img
      .resize(80, 80)
      .quality(60)
      .write(
        path.join(__dirname, '../../public/contact/avatars/') + 'Small_' + name
      );
    const avatarsUrl = {
      largerAvatarURL: '/contact/avatars' + '/Large_' + name,
      smallAvatarURL: '/contact/avatars' + '/Small_' + name,
    };
    await ContactModel.findOneAndUpdate(
      { _id },
      { $set: { ...avatarsUrl } },
      { returnDocument: 'after' }
    );
    return avatarsUrl;
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
