// src/handlers/auth.handler.ts
const registerUser = require('../services/auth.service')

export const handleRegister = async (input) => {
  // Extraer datos del cuerpo de la solicitud
  const { name, email, password, username } = input;

  // Validar campos requeridos
  if (!name || !email || !password || !username) {
    throw new Error('All fields are required');
  }

  // Validar tipos manualmente
  if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string' || typeof username !== 'string') {
    throw new Error('All fields must be strings');
  }

  // Registrar el usuario
  const newUser = await registerUser({ name, email, password, username });

  // Devolver respuesta exitosa
  return {
    message: 'User registered successfully',
    user: { name, email, username },
  };
};