// routes/user.routes.js
const express = require("express");
const { updateUser, updateDarkMode, upload, getDarkModePreference, updatePassword } = require("../controllers/user.controllers");
const { onlyUser } = require("../middlewares/authorization");

const router = express.Router();

// Ruoute for updating user data
router.patch("/update-profile", onlyUser, upload.single("profileImg"), updateUser);


// Route for getting and updating dark mode preference
router.get('/get-dark-mode', getDarkModePreference)
router.patch("/update-dark-mode", onlyUser, updateDarkMode);

// route for Changing Password preference
router.patch("/update-password", onlyUser, updatePassword);

module.exports = router;