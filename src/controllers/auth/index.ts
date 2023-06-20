import { logout } from "./logout";
import { refreshTokens } from "./refresh";
import { register } from "./register";
import { login } from "./login";

export const authControllers = {
  register,
  login,
  logout,
  refreshTokens,
};
