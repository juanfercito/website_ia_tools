
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Cargar variables de entorno
    const ADMIN_NAME = process.env.ADMIN_NAME;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;

    // Buscar el rol de administrador
    const adminRole = await prisma.role.findUnique({ where: { name: 'admin' } });
    if (!adminRole) {
      throw new Error('the admin role does not exist');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

    // Verificar si el usuario administrador ya existe
    const existingAdmin = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Crear el usuario administrador
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