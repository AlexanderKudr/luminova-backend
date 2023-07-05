import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

const handleDisconnectDB = async (): Promise<void> => await prisma.$disconnect();

const handleErrorDB = async (e: any): Promise<void> => {
  console.error(e);
  handleDisconnectDB();
  process.exit(1);
};

export { handleDisconnectDB, handleErrorDB, prisma };
