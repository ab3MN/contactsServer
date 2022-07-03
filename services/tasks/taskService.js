const { TaskModel } = require('./tasksModel');

const getTasks = async (owner) => await TaskModel.find({ owner });

const getTaskById = async (owner, _id) => await TaskModel.find({ owner, _id });

const addTask = async (owner, data) => await new TaskModel({ ...data, owner });

const updateTaskStatus = async (owner, _id, isCompleted) =>
  await TaskModel.findOneAndUpdate(
    { _id, owner },
    { $set: { isCompleted } },
    { returnDocument: 'after' }
  );

const updateTaskFinish = async (owner, _id, finish) =>
  await TaskModel.findOneAndUpdate(
    { _id, owner },
    { $set: { finish } },
    { returnDocument: 'after' }
  );

const deleteTask = async (owner, _id) =>
  await TaskModel.deleteOne({ owner, _id });

module.exports = {
  getTasks,
  addTask,
  updateTaskStatus,
  updateTaskFinish,
  deleteTask,
  getTaskById,
};
