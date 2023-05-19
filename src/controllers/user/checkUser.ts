import { prisma, handleDisconnectDB, handleErrorDB } from "../../utils";

const checkUserInDB = async (field: string, value: string) => {
  try {
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
