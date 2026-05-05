const {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTasks,
} = require('../models/taskModel');


//Create a new task for logged-in user 
const create = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    // Create task in DB
    const taskId = await createTask({
      title,
      description,
      status,
      userId: req.user.id, // from JWT middleware
    });

    res.status(201).json({
      success: true,
      message: 'Task created',
      taskId,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getMyTasks,
  getOne,
  update,
  remove,
  getAll,
};