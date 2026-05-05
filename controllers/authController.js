const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findByEmail, findByUsername, createUser } = require('../models/userModel');
require('dotenv').config();

// User registration
const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingEmail = await findByEmail(email);
    if (existingEmail) {
      return res.status(409).json({ success: false, message: 'Email already in use' });
    }

    const existingUsername = await findByUsername(username);
    if (existingUsername) {
      return res.status(409).json({ success: false, message: 'Username already taken' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const userId = await createUser({
      username,
      email,
      hashedPassword,
      role: role === 'admin' ? 'admin' : 'user',
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };