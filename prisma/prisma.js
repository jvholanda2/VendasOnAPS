import { PrismaClient } from '@prisma/client';
let prisma;
function getPrisma() {
  if (prisma instanceof PrismaClient) {
    return prisma;
  }
  return new PrismaClient();
}
export { getPrisma };

