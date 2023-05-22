import { checkUserInDB } from "./checkUser";
import { updateUserTokensInDB } from "./updateUserTokens";
import { updateRefreshTokenInDB } from "./updateRefreshTokens";
import { clearUserTokensInDB } from "./clearUserTokens";
import { handleCreateUser } from "./createUser";

export const userControllers = {
  checkUserInDB,
  updateUserTokensInDB,
  updateRefreshTokenInDB,
  clearUserTokensInDB,
  handleCreateUser,
};
