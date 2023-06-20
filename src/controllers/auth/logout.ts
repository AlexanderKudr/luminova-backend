import { Controller } from "../../types";
import { databaseUtils } from "../../utils";

const { clearUserTokensInDB } = databaseUtils;

const logout: Controller = (req, res) => {
  const { refreshToken } = req.cookies as { refreshToken: string };

  if (!refreshToken) {
    return res.status(401).send({ error: "Refresh token missing" });
  }

  clearUserTokensInDB(refreshToken);

  res.clearCookie("refreshToken");

  res.send({ message: "User logged out successfully" });
};

export { logout };
