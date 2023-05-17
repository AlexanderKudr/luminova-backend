import { prisma, handleDisconnectDB, handleErrorDB } from "../../utils";

const updateRefreshTokenInDB = async (refreshToken: string) => {
  try {
    const user = await prisma.user.updateMany({
      where: { refreshToken },
      data: { refreshToken },
    });
    if (!user) {
      throw new Error("User not found");
    }
    await handleDisconnectDB();
    return user;
  } catch (error) {
    await handleErrorDB(error);
    return null;
  }
};
export { updateRefreshTokenInDB };