// src/mailer.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Or your Email Service Provider
  auth: {
    user: process.env.MAILER_EMAIL_USER,
    pass: process.env.MAILER_EMAIL_PASSWORD,
  },
});

module.exports = transporter;