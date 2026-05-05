const pool = require('../config/db');

// Create a new task in DB
const createTask = async ({ title, description, status = 'pending', userId }) => {
  const [result] = await pool.execute(
    'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)',
    [title, description, status, userId]
  );

  return result.insertId;
};


//get tasks for a specific user
const getTasksByUser = async (userId, status = null) => {
  if (status) {
    const [rows] = await pool.execute(
      'SELECT * FROM tasks WHERE user_id = ? AND status = ? ORDER BY created_at DESC',
      [userId, status]
    );
    return rows;
  }

  const [rows] = await pool.execute(
    'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );

  return rows;
};


// Get a single task by ID
const getTaskById = async (id) => {
  const [rows] = await pool.execute(
    'SELECT * FROM tasks WHERE id = ?',
    [id]
  );

  return rows[0];
};


// Update task by ID
const updateTask = async (id, { title, description, status }) => {
  const [result] = await pool.execute(
    'UPDATE tasks SET title = ?, description = ?, status = ?, updated_at = NOW() WHERE id = ?',
    [title, description, status, id]
  );

  return result.affectedRows;
};


// Delete task by ID
const deleteTask = async (id) => {
  const [result] = await pool.execute(
    'DELETE FROM tasks WHERE id = ?',
    [id]
  );

  return result.affectedRows;
};


// Get all tasks (admin view)
const getAllTasks = async (status = null) => {
  if (status) {
    const [rows] = await pool.execute(
      `SELECT tasks.*, users.username 
       FROM tasks 
       JOIN users ON tasks.user_id = users.id 
       WHERE tasks.status = ? 
       ORDER BY tasks.created_at DESC`,
      [status]
    );

    return rows;
  }

  const [rows] = await pool.execute(
    `SELECT tasks.*, users.username 
     FROM tasks 
     JOIN users ON tasks.user_id = users.id 
     ORDER BY tasks.created_at DESC`
  );

  return rows;
};


module.exports = {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTasks,
};