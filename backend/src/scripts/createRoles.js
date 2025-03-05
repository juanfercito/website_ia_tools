const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { name: 'admin', description: 'System Admin' },
    { name: 'freeUser', description: 'User for Free' },
    { name: 'premiumUser', description: 'Premium or Pro User' },
  ];

  for (const role of roles) {
    await prisma.role.create({
      data: role,
    });
  }

  console.log('Roles created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });