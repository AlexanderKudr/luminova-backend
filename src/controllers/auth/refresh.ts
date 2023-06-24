import { publicKey, privateKey } from "../../config";
import { Controller } from "../../types";
import { time, databaseUtils, jwtUtils } from "../../utils";

const { time30days } = time;
const { checkUserInDB, updateRefreshTokenInDB } = databaseUtils;
const { verifyToken, generateTokens } = jwtUtils;

const refreshTokens: Controller = async (req, res) => {
  try {
    const { refreshToken } = req.cookies as { refreshToken: string };
    if (!refreshToken) {
      return res.status(401).send({ error: "Refresh token missing" });
    }

    const token = verifyToken(refreshToken, publicKey!);
    if (!token) {
      return res.status(401).send({ error: "Invalid or expired refresh token" });
    }

    const user = await checkUserInDB("refreshToken", refreshToken);
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    const tokens = generateTokens(refreshToken, privateKey!);

    updateRefreshTokenInDB(tokens.refreshToken);

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: time30days,
      secure: true,
    });

    res.send({
      message: "Token refreshed and user logged in successfully",
      user: await checkUserInDB("email", refreshToken),
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({ error: "Server error" });
  }
};
export { refreshTokens };
