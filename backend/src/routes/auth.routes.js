const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { onlyUser, onlyAdmin} = require('../middlewares/authorization');
const { login, register } = require('../controllers/auth.controllers')

dotenv.config();

const router = express.Router();

router.post("/login", login, (req, res) => {
  // Lógica de login aquí
  res.send("Login route");
});

router.post("/register", register, (req, res) => {
  // Lógica de registro aquí
  res.send("Register route");
});

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

// Exportar el enrutador
module.exports = router;