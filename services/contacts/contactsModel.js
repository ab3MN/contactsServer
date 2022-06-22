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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    largeAvatarURL: {
      type: String,
      default:
        'https://gravatar.com/avatar/6408bc7d1b20e748bb685acdb67f2355?s=250',
    },
    smallAvatarURL: {
      type: String,
      default:
        'https://gravatar.com/avatar/6408bc7d1b20e748bb685acdb67f2355?s=80',
    },
  },
  { versionKey: false }
);

module.exports = {
  ContactModel: model('Contact', contactSchema),
};
