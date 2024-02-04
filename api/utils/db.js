import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUser(id) {
  return prisma.users.findUnique({
    where: {
      id: BigInt(id),
    },
  });
}

async function createUser({ id, type, lang }) {
  return prisma.users.create({
    data: {
      id: BigInt(id),
      type: type,
      lang: lang,
    },
  });
}

export default {
  getUser,
  createUser,
};
