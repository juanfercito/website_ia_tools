const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { onlyUser, onlyAdmin} = require('../middlewares/authorization');
const { login, register, allUsers, adminUser, logout } = require('../controllers/auth.controllers');
const { limiter, sendVerificationCode, verifyCode, changePassword } = require('../controllers/auth.controlPassword');

dotenv.config();

const router = express.Router();

// Authentication Routes 
router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

router.post('/send-verification-code', limiter, sendVerificationCode);

router.post('/verify-code', verifyCode);

router.post('/change-password', changePassword);

// Access routes for authenticated users
router.get("/me", onlyUser, allUsers);

router.get("/admin/me", onlyAdmin, adminUser);

module.exports = router;