import { Controller } from "../../utils";
import { databaseService } from "../../services";

const { clearUserTokensInDB } = databaseService;

const logout: Controller = (req, res) => {
  const { refreshToken } = req.cookies as { refreshToken: string };

  if (!refreshToken) {
    return res.status(401).send({ error: "Refresh token is missing" });
  }

  clearUserTokensInDB(refreshToken);

  res.clearCookie("refreshToken");

  res.send({ message: "User logged out successfully" });
};

export { logout };
