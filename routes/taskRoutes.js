const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

const {
  create,
  getMyTasks,
  getOne,
  update,
  remove,
  getAll,
} = require('../controllers/taskController');

router.use(protect);

// Create new task
router.post('/', create);

// Get logged-in user's tasks
router.get('/', getMyTasks);

// Get all tasks (admin only)
router.get('/admin/all', authorize('admin'), getAll);

// Get single task by ID
router.get('/:id', getOne);

// Update task by ID
router.put('/:id', update);

// Delete task by ID
router.delete('/:id', remove);

module.exports = router;