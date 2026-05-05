const pool = require('../config/db');

// Create a new task in DB
const createTask = async ({ title, description, status = 'pending', userId }) => {
  const [result] = await pool.execute(
    'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)',
    [title, description, status, userId]
  );

  return result.insertId;
};


module.exports = {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTasks,
};