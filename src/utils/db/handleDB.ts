import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handleDisconnectDB = async () => await prisma.$disconnect();

const handleErrorDB = async (e: any) => {
  console.error(e);
  handleDisconnectDB();
  process.exit(1);
};

export { handleDisconnectDB, handleErrorDB, prisma };
