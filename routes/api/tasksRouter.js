const express = require('express');
const { getUserByToken } = require('../../middlewares/users/getUserByToken');
const {
  _getTasks,
  _addTask,
  _updateTaskStatus,
  _updateTaskFinish,
  _deleteTask,
} = require('../../controllers/tasksController');
const {
  dateError,
  statusError,
  dataError,
} = require('../../middlewares/tasks/tasksError');

const router = express.Router();
const jsonParser = express.json();

router.use('/', getUserByToken);

/* ==================== Get Tasks ==================== */
router.get('/', _getTasks);

/* ==================== Add Task ==================== */
router.post('/', jsonParser, dataError);
router.post('/', jsonParser, dateError);
router.post('/', jsonParser, _addTask);

/* ==================== Update isCompleted ==================== */
router.patch('/:id/iscompleted', jsonParser, statusError);
router.patch('/:id/iscompleted', jsonParser, _updateTaskStatus);

/* ==================== Update Finish Date ==================== */
router.patch('/:id/finish', jsonParser, _updateTaskFinish);

/* ==================== Delete Task ==================== */
router.delete('/:id', _deleteTask);

module.exports = router;
