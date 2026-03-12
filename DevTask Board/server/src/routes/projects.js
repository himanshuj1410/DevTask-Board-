const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../controllers/projects');

const router = express.Router();

router.get('/', authenticateToken, getAllProjects);
router.post('/', authenticateToken, createProject);
router.get('/:id', authenticateToken, getProjectById);
router.put('/:id', authenticateToken, updateProject);
router.delete('/:id', authenticateToken, deleteProject);

module.exports = router;
