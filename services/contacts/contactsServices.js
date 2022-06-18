const { ContactModel } = require('./contactsModel');

const getContacts = async () => await ContactModel.find({});

const getContactsByPageAndLimit = async (page = 0, limit = 0) => {
  const contacts = await getContacts();
  if (+page === 0 || isNaN(+page) || +limit === 0 || isNaN(+limit)) {
    return contacts;
  }
  return contacts.slice((page - 1) * limit, page * limit);
};
const getContactsById = async (id) => await ContactModel.findById(id);

const getContactsByContactStatusFavorite = async (status) => {
  const _status = status === 'true';
  return await ContactModel.find({ favorite: _status });
};

const addContact = async (data) => await new ContactModel({ ...data });

const updateContact = async (_id, data) =>
  await ContactModel.findOneAndUpdate(
    { _id },
    { $set: { ...data } },
    { returnDocument: 'after' }
  );

const deleteContact = async (id) => await ContactModel.findByIdAndDelete(id);

const updateStatusContactFavorite = async (_id, favorite) =>
  await ContactModel.findOneAndUpdate(
    { _id },
    { $set: { favorite } },
    { returnDocument: 'after' }
  );

module.exports = {
  getContacts,
  getContactsById,
  addContact,
  updateContact,
  deleteContact,
  updateStatusContactFavorite,
  getContactsByPageAndLimit,
  getContactsByContactStatusFavorite,
};
