const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const rateLimit = require('express-rate-limit');
const transporter = require('../config/mailer');

const prisma = new PrismaClient();

const sender = process.env.MAILER_EMAIL_USER;

// Rate limit for requests(max 3 requests/hour)
const limiter = rateLimit({
    WindowMs: 60 * 60 * 1000, // 60 minutes
    max: 3,
    message: 'Too many requests from this IP, please try again in an hour.'
});

async function sendVerificationCode(req, res) {
    try {
        const { email } = req.body;
        // Find User
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Generate a random verification code
        const verificationCode = Math.floor(100000 * Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

        // Save code in verificationCode table
        await prisma.verificationCode.create({
            data: {
                userId: user.id,
                code: verificationCode,
                expiresAt
            },
        });
        // Send verification code email
        await transporter.sendMail({
            from: `${sender}`,
            to: email,
            subject: 'Verification Code',
            text: `Your verification code is: ${verificationCode}`,
        });
        res.json({ message: 'Verification code sent, check your email' });
    }catch(error) {
        res.status(500).json({ message: 'Internal Server Error' });
    };
};

async function verifyCode(req, res) {
    try {
        const { email, verificationCode } = req.body;
        // Find Code
        const codeRecord = await prisma.verificationCode.findFirst({
            where: {
                user: { email },
                code: verificationCode,
                expiresAt: { gt: new Date() } // Active code
            },
        });
        if (!codeRecord) {
            return res.status(400).json({ message: 'Invalid or expired code' });
        }
        res.json({ message: 'Code verified successfully' });
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error' });
    };
};

async function changePassword(req, res) {
    try {
        const { email, verificationCode, newPassword } = req.body;

        // validate the new password
        if (newPassword.lenght <= 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }
            // Find Valid code
        codeRecord = await prisma.verificationCode.findFirst({
            where: {
                user: { email },
                code: verificationCode,
                expiresAt: { gt: new Date() } // Active code
            },
            include: { user: true },
        });
        if (!codeRecord) {
            return res.status(400).json({ message: 'Invalid or expired code' });
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        // Update user password
        await prisma.user.update({
            where: { id: codeRecord.userId },
            data: { password: hashedPassword },
        });
        // Delete used/expired codes
        await prisma.verificationCode.deleteMany({
            where: { userId: codeRecord.userId },
        });
        res.json({ message: 'Password changed successfully' });
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error' });
    };
};

module.exports = {
    limiter,
    sendVerificationCode,
    verifyCode,
    changePassword,
};