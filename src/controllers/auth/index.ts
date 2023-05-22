import { logout } from "./logout";
import { protectedAccess } from "./protected";
import { refreshTokens } from "./refresh";
import { register } from "./register";
import { login } from "./login";

export const authControllers = {
  register,
  login,
  logout,
  protectedAccess,
  refreshTokens,
};
