import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
type User = {
  email: string;
  password: string;
  accessToken?: string | null;
  refreshToken?: string | null;
};
// async function main(user: User) {
//   const addUser = await prisma.user.create({
//     data: {
//       email: user.email,
//       password: user.password,
//     },
//   });
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
