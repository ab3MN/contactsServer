const { Schema, model } = require('mongoose');

const taskModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    finish: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false }
);

module.exports = {
  TaskModel: model('Task', taskModel),
};
