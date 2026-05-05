const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findByEmail, findByUsername, createUser } = require('../models/userModel');
require('dotenv').config();

module.exports = { register, login };