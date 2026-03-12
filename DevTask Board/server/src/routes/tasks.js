const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks');

const router = express.Router();

router.get('/project/:projectId', authenticateToken, getTasksByProject);
router.post('/project/:projectId', authenticateToken, createTask);
router.put('/:taskId', authenticateToken, updateTask);
router.delete('/:taskId', authenticateToken, deleteTask);

module.exports = router;
