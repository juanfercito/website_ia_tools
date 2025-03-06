// Imports
const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config');
const { registerUser, loginUser, changePassword } = require('../services/auth.service');
const { 
  validateRequiredFields, 
  validateName, 
  validateUsername, 
  validateEmail, 
  validatePassword 
} = require('../middlewares/authValidation');
const {addToBlacklist} = require('../middlewares/blacklist');
const { authenticateUser } = require('../middlewares/authJwtUser');

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

// Route POST for Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    validateRequiredFields({ email, password }, ['email', 'password']);
    validateEmail(email);
    validatePassword(password);

    const { token, refreshToken, user } = await loginUser({ email, password });

    res.cookie('refresh_token', refreshToken, {
      expires: new Date(Date.now() + 3600000), // 1 hour
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
      sameSite: 'strict', // Only set SameSite cookies in the same site
      maxAge:7*24*60*60*1000, // 7 days
    })

    return res.status(200).json ({
      message: 'Login successful',
      token,
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
      } 
    })
  } catch (error) {
  
    if (error instanceof Error) {
      return res.status(401).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Refresh the token
router.post('/refresh-token', async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Unauthorized: Missing refresh token' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);

    // Generate a new Access Token
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '15m' } // 15 minutos
    );

    return res.status(200).json({
      message: 'Access token refreshed successfully',
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error('Error refreshing token:', error.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid refresh token' });
  }
});

router.get('/protected', authenticateUser, (req, res) => {

  try {
    const { username } = req.user;
    return res.status(200).json({ 
      message: 'Access Granted',
      content: {
        greeting: `Hello ${username}`,
        description: 'This is a exclusive content for authenticated users'
      }
     });

    } catch (error) {
      console.error('Error verifying token', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route POST for Logout
router.post('/logout', async (req, res) => {
  try {

    const refreshToken = req.cookies.refresh_token;

    if (refreshToken) {
      await addToBlacklist(refreshToken);
        // Delete the token cookie from the session
      res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
    }

    return res.status(200).json({
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Error during logout:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route POST for Change Password
router.post('/change-password', authenticateUser, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.userId;

    // Validate old password
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Old and new passwords are required' });
    }

    // Change password
    const result = await changePassword(userId, oldPassword, newPassword);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});
module.exports = router;