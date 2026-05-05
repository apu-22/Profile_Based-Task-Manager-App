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


//Get tasks for logged-in user
const getMyTasks = async (req, res, next) => {
  try {
    const { status } = req.query;

    const tasks = await getTasksByUser(req.user.id, status);

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (err) {
    next(err);
  }
};


//Get a single task with id
const getOne = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Authorization check (owner or admin only)
    if (task.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (err) {
    next(err);
  }
};


//update task
const update = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    if (task.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    const { title, description, status } = req.body;

    // Update only provided fields
    await updateTask(req.params.id, {
      title: title ?? task.title,
      description: description ?? task.description,
      status: status ?? task.status,
    });

    res.status(200).json({
      success: true,
      message: 'Task updated',
    });
  } catch (err) {
    next(err);
  }
};


//Delete task
const remove = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    if (task.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    await deleteTask(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Task deleted',
    });
  } catch (err) {
    next(err);
  }
};


//Get all tasks
const getAll = async (req, res, next) => {
  try {
    const { status } = req.query;

    const tasks = await getAllTasks(status);

    res.status(200).json({
      success: true,
      tasks,
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