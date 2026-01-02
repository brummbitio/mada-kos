import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@madakos.com' },
    update: {},
    create: {
      email: 'admin@madakos.com',
      password: hashedPassword,
      fullName: 'Admin Mada',
      phoneNumber: '0812',
      role: 'SUPERADMIN',
      referralCode: 'MADA01'
    },
  })
  console.log('✅ Seed Success!')
}

main().catch(console.error).finally(() => prisma.$disconnect())