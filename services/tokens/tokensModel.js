const { Schema, model } = require('mongoose');

const tokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  accessToken: { type: String, required: true },
});

module.exports = {
  TokenModel: model('Token', tokenSchema),
};
