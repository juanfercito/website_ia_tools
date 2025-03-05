// Regular Expressions for validation
const nameRegex = /^[a-zA-Z\s'-]+$/; // Solo letras, espacios, apóstrofes y guiones
const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/; // Letras, números, guiones bajos y guiones, longitud entre 3 y 20
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato básico de correo electrónico
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Al menos 8 caracteres, una mayúscula, una minúscula y un número

// Función para validar los datos de registro
const validateRequiredFields = (data, requiredFields) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Data is required');
  }

  const missingfields = requiredFields.filter((field) => !data[field]);

  // Validar campos requeridos
if (missingfields.length > 0) {
  throw new Error(`All fields are required: ${missingfields.join(', ')}`);
}
}

  // Validar name
const validateName = (name) =>{
  if (!nameRegex.test(name)) {
    throw new Error('Name contains invalid characters, please enter a valid name');
  }
}

  // Validar username
const validateUsername = (username) => {
  if (!usernameRegex.test(username)) {
    throw new Error(
      'Username can only contain letters, numbers, underscores and hyphens, length between 3 and 20'
    );
  }
}

  // Validar email
const validateEmail = (email) => {
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email. Please enter a valid email address');
  }
}

  // Validar password
const validatePassword = (password) => {
  if (!passwordRegex.test(password)) {
    throw new Error(
      'Invalid password. Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number'
    );
  }
}

module.exports = {
  validateRequiredFields,
  validateName,
  validateUsername,
  validateEmail,
  validatePassword,
};