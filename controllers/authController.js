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


// User login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const user = await findByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};


module.exports = { register, login };