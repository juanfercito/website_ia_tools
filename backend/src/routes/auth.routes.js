// Imports
const express = require('express');
const { registerUser, loginUser } = require('../services/auth.service');
const { 
  validateRequiredFields, 
  validateName, 
  validateUsername, 
  validateEmail, 
  validatePassword 
} = require('../middlewares/authValidation');

// Initialize router for the app.js
const router = express.Router();

// Route for registering a new user
router.post('/register', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Validate required fields
    validateRequiredFields({ name, username, email, password }, ['name', 'username', 'email', 'password']);
    validateName(name);
    validateUsername(username);
    validateEmail(email);
    validatePassword(password);

    // Register new user
    const newUser = await registerUser({ name, username, email, password });

    return res.status(201).json({
      message: 'User registration successful',
      user: { name, username, email },
    });
  } catch (error) {
    // Specific Error handling
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    // Unexpected error handling
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route POST pfor Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    validateRequiredFields({ email, password }, ['email', 'password']);
    validateEmail(email);
    validatePassword(password);

    const { token, user } = await loginUser({ email, password });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
  
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;