const { Schema, model } = require('mongoose');

const tokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  accessToken: { type: String, required: true },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: 60 * 60 * 24 },
  },
});

module.exports = {
  TokenModel: model('Token', tokenSchema),
};
