const express = require('express');
const { getUserByToken } = require('../../middlewares/users/getUserByToken');
const { _getTask, _addTask } = require('../../controllers/tasksController');

const router = express.Router();
const jsonParser = express.json();

router.use('/', getUserByToken);

router.get('/', _getTask);
router.post('/', jsonParser, _addTask);

module.exports = router;
