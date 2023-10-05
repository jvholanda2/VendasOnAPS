import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'teste@teste.com' },
    update: {},
    create: {
      id: 1,
      email: 'teste@teste.com',
      name: 'teste',
      password: '123456',
      address: "rua da tal"
    },
  })
  
  console.log({ alice})
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })