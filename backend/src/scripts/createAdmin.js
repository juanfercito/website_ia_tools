
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Charge Environment Variables
    const ADMIN_NAME = process.env.ADMIN_NAME;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;

    // Finde the 'Admin' role
    const adminRole = await prisma.role.findUnique({ where: { name: 'admin' } });
    if (!adminRole) {
      throw new Error('the admin role does not exist');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

    // Verify if User already exists
    const existingAdmin = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create the Admin User
    await prisma.user.create({
      data: {
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        username: ADMIN_USERNAME,
        roleId: adminRole.id,
      },
    });

    console.log('Admin Created Successfully');
  } catch (error) {
    console.error('Error by creating Admin User:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();