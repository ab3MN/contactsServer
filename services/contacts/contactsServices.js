const { Contact } = require('./contactsModel');

const getContacts = () => Contact.find({});

const getContactsById = (id) => Contact.findById(id);

const addContact = (data) => new Contact({ ...data });

const updateContact = (_id, data) =>
  Contact.findOneAndUpdate(
    { _id },
    { $set: { ...data } },
    { returnDocument: 'after' }
  );

const deleteContact = (id) => Contact.findByIdAndDelete(id);

const updateStatusContact = (_id, favorite) =>
  Contact.findOneAndUpdate(
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
