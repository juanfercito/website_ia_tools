// routes/user.routes.js
const express = require("express");
const { updateUser, upload } = require("../controllers/user.controllers");
const { onlyUser } = require("../middlewares/authorization");

const router = express.Router();

// Ruta para actualizar datos del usuario
router.patch("/update-profile", onlyUser, upload.single("profileImg"), updateUser);

module.exports = router;