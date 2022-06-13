const { ContactModel } = require('./contactsModel');

const getContacts = async () => await ContactModel.find({});

const getContactsById = async (id) => await ContactModel.findById(id);

const addContact = async (data) => await new ContactModel({ ...data });

const updateContact = async (_id, data) =>
  await ContactModel.findOneAndUpdate(
    { _id },
    { $set: { ...data } },
    { returnDocument: 'after' }
  );

const deleteContact = async (id) => await ContactModel.findByIdAndDelete(id);

const updateStatusContact = async (_id, favorite) =>
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
  updateStatusContact,
};
