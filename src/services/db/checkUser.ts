import { prisma, handleDisconnectDB, handleErrorDB } from "./handleDB";

const checkUserInDB = async (field: string, value: string) => {
  try {
    console.log(field, value);
    const user = await prisma.user.findFirst({
      where: { [field]: value },
    });

    await handleDisconnectDB();

    return user;
  } catch (error) {
    await handleErrorDB(error);

    return null;
  }
};

export { checkUserInDB };
