import { publicKey, privateKey } from "../../config/keys";
import { Controller } from "../../types/middlewares";
import { checkUserInDB, updateRefreshTokenInDB } from "../prisma";
import { time, verifyToken, generateTokens } from "../../utils";

const { time30days } = time;

const refreshTokens: Controller = async (req, res) => {
  const { refreshToken } = req.cookies as { refreshToken: string };
  
  try {
    if (!refreshToken) {
      return res.status(401).send({ error: "Refresh token missing" });
    }
    const token = verifyToken(refreshToken, publicKey!);
    if (!token) {
      return res.status(401).send({ error: "Invalid refresh token" });
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
