// src/mailer.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.MAILER_EMAIL_SERVICE, // Or your Email Service Provider
  auth: {
    user: process.env.MAILER_EMAIL_USER,
    pass: process.env.MAILER_EMAIL_PASSWORD,
  },
});

module.exports = transporter;