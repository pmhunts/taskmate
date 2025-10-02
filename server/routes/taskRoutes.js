const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks);

router.get('/search', taskController.searchTasks);

router.get('/category/:category', taskController.getTasksByCategory);

router.get('/:id', taskController.getTaskById);

router.post('/', taskController.createTask);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

router.patch('/:id/toggle', taskController.toggleTaskCompletion);

module.exports = router;
