import { UpdateUserTokens } from "../../utils";
import { prisma, handleDisconnectDB, handleErrorDB } from "./handleDB";

const updateUserTokensInDB = async ({ email, accessToken, refreshToken }: UpdateUserTokens) => {
  try {
    const user = await prisma.user.updateMany({
      where: { email: email },
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await handleDisconnectDB();
  } catch (error) {
    await handleErrorDB(error);
  }
};
export { updateUserTokensInDB };
