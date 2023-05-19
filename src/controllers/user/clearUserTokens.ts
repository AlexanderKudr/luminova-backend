import { prisma, handleDisconnectDB, handleErrorDB } from "../../utils";

const clearUserTokensInDB = async (refreshToken: string) => {
  try {
    const user = await prisma.user.updateMany({
      where: { refreshToken },
      data: { accessToken: null, refreshToken: null },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await handleDisconnectDB();
  } catch (error) {
    await handleErrorDB(error);
  }
};
export { clearUserTokensInDB };
