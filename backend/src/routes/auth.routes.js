const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { onlyUser, onlyAdmin} = require('../middlewares/authorization');
const { login, register } = require('../controllers/auth.controllers')

dotenv.config();

const router = express.Router();

// Authentication Routes 
router.post("/login", login, (req, res) => {
  // Lógica de login aquí
  res.send("Login route");
});

router.post("/register", register);

router.post("/logout", (req, res) => {
  try {
    // Limpiar la cookie JWT
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Solo en producción si usas HTTPS
      sameSite: "lax",
      path: "/", // Debe coincidir con el path usado al configurar la cookie
    });

    // Responder con éxito
    return res.json({ status: "ok", message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

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
router.get("/me", onlyUser, (req, res) => {
  try {
    const user = req.user; // El middleware `onlyUser` ya adjuntó el usuario al objeto de solicitud
    return res.json({
      status: "ok",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role.name,
      },
    });
  } catch (error) {
    console.error("Error fetching admin data:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
});
router.get("/admin/me", onlyAdmin, async (req, res) => {
  try {
    const admin = req.user; // El middleware `onlyAdmin` ya adjuntó el usuario al objeto de solicitud
    return res.json({
      status: "ok",
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        username: admin.username,
        role: admin.role.name,
      },
    });
  } catch (error) {
    console.error("Error fetching admin data:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

module.exports = router;