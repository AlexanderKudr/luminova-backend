import { handleDisconnectDB, handleErrorDB, prisma } from "./handleDB";
import { checkUserInDB } from "./checkUser";
import { updateUserTokensInDB } from "./updateUserTokens";
import { updateRefreshTokenInDB } from "./updateRefreshTokens";
import { clearUserTokensInDB } from "./clearUserTokens";
import { handleCreateUser } from "./createUser";

export const databaseUtils = {
  handleDisconnectDB,
  handleErrorDB,
  prisma,
  checkUserInDB,
  updateUserTokensInDB,
  updateRefreshTokenInDB,
  clearUserTokensInDB,
  handleCreateUser,
};
