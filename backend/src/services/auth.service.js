const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SALTROUNDS, JWT_SECRET_KEY } = require('../config');

const {
  validateRequiredFields,
  validateName,
  validateUsername,
  validateEmail,
  validatePassword,
} = require('../middlewares/authValidation');

const prisma = new PrismaClient();

// Hashing Password Function
const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALTROUNDS);
};

// Register new Users
const registerUser = async ({ name, email, password, username }) => {
  // validate fields
  validateRequiredFields({ name, email, password, username }, ['name', 'email', 'password', 'username']);
  validateName(name);
  validateUsername(username);
  validateEmail(email);
  validatePassword(password);

  // verify if email is already registered
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  // verify if username is already registered
  const existingUsername = await prisma.user.findUnique({ where: { username } });
  if (existingUsername) {
    throw new Error('Username already in use');
  }

  // Find the role 'freeUser' in the database
  const freeUserRole = await prisma.role.findUnique({ where: { name: 'freeUser' } });
  if (!freeUserRole) {
    throw new Error("The role 'freeUser' doesn't exist in database");
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create the new user
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      username,
      roleId: freeUserRole.id,
    },
  });

  return newUser;
};

// login Sesion
const loginUser = async ({ email, password }) => {

  validateRequiredFields({ email, password }, ['email', 'password']);
  validateEmail(email);
  validatePassword(password);

  // Find if the user is already registered
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Compare the password with the hash stored in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Create a JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.roleId },
    JWT_SECRET_KEY,
    { expiresIn: '1h' }
  );

  // Return the token and the user data
  return {
    token,
    user: {
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.name,
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
};