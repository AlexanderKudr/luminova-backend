import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const deletepost = await prisma.post.delete({
    where: {
      id: 1,
    },
  })
  console.log(deletepost)
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
