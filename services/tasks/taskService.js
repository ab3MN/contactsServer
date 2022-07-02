const { TaskModel } = require('./tasksModel');

const getTask = async (owner) => await TaskModel.find({ owner });

const addTask = async (owner, data) => await new TaskModel({ ...data, owner });

module.exports = { getTask, addTask };
