const {
  getTasks,
  addTask,
  updateTaskStatus,
  updateTaskFinish,
  deleteTask,
  getTaskById,
} = require('../services/tasks/taskService');
const { isItADate } = require('../helpers/isItADate');

/* ==================== Get Tasks ==================== */
const _getTasks = async (req, res, next) => {
  try {
    const tasks = await getTasks(req.user.id);
    res.send(tasks);
  } catch (e) {
    next(e);
  }
};

/* ==================== Add Task ==================== */
const _addTask = async (req, res, next) => {
  try {
    const { start, finish } = req.body;
    if (!isItADate(start) & !isItADate(finish)) {
      return res.status(400).json({});
    }
    const task = await addTask(req.user.id, req.body);
    task.save();
    res.send(task).status(201);
  } catch (e) {
    next(e);
  }
};

/* ==================== Update isCompleted ==================== */
const _updateTaskStatus = async (req, res, next) => {
  try {
    const task = await updateTaskStatus(
      req.user.id,
      req.params.id,
      req.body.isCompleted
    );
    return res.send({
      message: 'isCompleted was change',
      task,
    });
  } catch (e) {
    next(e);
  }
};

/* ==================== Update Finish Date ==================== */
const _updateTaskFinish = async (req, res, next) => {
  try {
    if (!req.body.finish)
      return res.status(400).json({ message: 'missing field finish ' });
    else if (!isItADate(req.body.finish))
      return res.status(400).json({
        message: 'finish formats are [dd/mm/yyyy, dd-mm-yyyy,dd.mm.yyyy]',
      });

    const task = await updateTaskFinish(
      req.user.id,
      req.params.id,
      req.body.isCompleted
    );
    return res.send({
      message: 'Finish date was change',
      task,
    });
  } catch (e) {
    next(e);
  }
};

/* ==================== Delete Task ==================== */
const _deleteTask = async (req, res, next) => {
  try {
    if (!(await getTaskById(req.user.id, req.params.id)))
      return res.status(404).json({ message: 'Task not found' });

    await deleteTask(req.user.id, req.params.id);
    res.send({ message: 'task  deleted' });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  _getTasks,
  _addTask,
  _updateTaskStatus,
  _updateTaskFinish,
  _deleteTask,
};
