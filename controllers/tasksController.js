const { getTask, addTask } = require('../services/tasks/taskService');

const _getTask = async (req, res, next) => {
  try {
    const tasks = await getTask(req.user.id);
    res.send(tasks);
  } catch (e) {
    next(e);
  }
};

const _addTask = async (req, res, next) => {
  try {
    const task = await addTask(req.user.id, req.body);
    task.save();
    res.send(task).status(201);
  } catch (e) {
    next(e);
  }
};

module.exports = { _getTask, _addTask };
