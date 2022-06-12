'use strict';
const { Schema, model } = require('mongoose');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);
const Contact = model('Contact', contactSchema);

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
