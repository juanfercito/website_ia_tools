const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { onlyUser, onlyAdmin} = require('../middlewares/authorization');
const { login, register, allUsers, adminUser, logout } = require('../controllers/auth.controllers');

dotenv.config();

const router = express.Router();

// Authentication Routes 
router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

router.post('/send-verification-code', async (req, res) => {
  const { email } = req.body;

  // Buscar al usuario en la base de datos
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Generar un código de verificación (por ejemplo, un número aleatorio)
  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  // Guardar el código en la base de datos (puedes agregar un campo `verificationCode` al modelo User)
  await prisma.user.update({
    where: { email },
    data: { verificationCode: String(verificationCode) },
  });

  // Enviar el código por correo electrónico (usa Nodemailer u otra biblioteca)
  console.log(`Verification code for ${email}: ${verificationCode}`);

  res.json({ message: 'Verification code sent successfully' });
});

router.post('/verify-code', async (req, res) => {
  const { email, verificationCode } = req.body;

  // Buscar al usuario en la base de datos
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.verificationCode !== verificationCode) {
    return res.status(400).json({ message: 'Invalid verification code' });
  }

  res.json({ message: 'Code verified successfully' });
});

router.post('/change-password', async (req, res) => {
  const { email, newPassword } = req.body;

  // Buscar al usuario en la base de datos
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Hashear la nueva contraseña
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Actualizar la contraseña en la base de datos
  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  res.json({ message: 'Password changed successfully' });
});


// Access routes for authenticated users
router.get("/me", onlyUser, allUsers);

router.get("/admin/me", onlyAdmin, adminUser);

module.exports = router;