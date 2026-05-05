const pool = require('../config/db');

// Find user by email
const findByEmail = async (email) => {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  return rows[0];
};

// Find user by username
const findByUsername = async (username) => {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );

  return rows[0];
};

// Create new user
const createUser = async ({
  username,
  email,
  hashedPassword,
  role = 'user',
}) => {
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
    [username, email, hashedPassword, role]
  );

  return result.insertId;
};

module.exports = {
  findByEmail,
  findByUsername,
  createUser,
};