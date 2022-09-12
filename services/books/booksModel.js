const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    owner: { type: Schema.Types.ObjectId, ref: 'user' },
  },
  { versionKey: false }
);

module.exports = {
  BookModel: model('Books', bookSchema),
};
