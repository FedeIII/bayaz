import { prisma } from '~/db.server';

export async function getPCs() {
  return prisma.pc.findMany();
}

export async function getPC(name) {
  return prisma.pc.findUnique({ where: { name } });
}

export async function createPC(pc) {
  return prisma.pc.create({ data: pc });
}
