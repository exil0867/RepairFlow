import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      username: `admin`,
      password: '$2b$10$X8Xm/ui0.pVhxXYTPJGKD.creKDYfTsSHyl6OBxgt6b6LJ0z5SSua',
    },
  })
}

main()
  .catch((e) => {
    console.error(e)

    process.exit(1)
  })

  .finally(async () => {
    await prisma.$disconnect()
  })
