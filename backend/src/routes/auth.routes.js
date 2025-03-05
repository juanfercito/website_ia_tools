
const express = require('express');
const { registerUser, loginUser } = require('../services/auth.service');
const { 
  validateRequiredFields, 
  validateName, 
  validateUsername, 
  validateEmail, 
  validatePassword 
} = require('../middlewares/authValidation');

const router = express.Router();

// Ruta POST para registrar un usuario
router.post('/register', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Validar los datos de entrada
    validateRequiredFields({ name, username, email, password }, ['name', 'username', 'email', 'password']);
    validateName(name);
    validateUsername(username);
    validateEmail(email);
    validatePassword(password);

    // Registrar el usuario
    const newUser = await registerUser({ name, username, email, password });

    // Devolver respuesta exitosa
    return res.status(201).json({
      message: 'User registration successful',
      user: { name, username, email },
    });
  } catch (error) {
    // Manejar errores específicos
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    // Manejar errores inesperados
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Ruta POST para iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar los datos de entrada
    validateRequiredFields({ email, password }, ['email', 'password']);
    validateEmail(email);
    validatePassword(password);

    // Iniciar sesión
    const { token, user } = await loginUser({ email, password });

    // Devolver respuesta exitosa
    return res.status(200).json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
    // Manejar errores específicos
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    // Manejar errores inesperados
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;