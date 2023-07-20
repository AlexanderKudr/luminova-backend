import { config } from "../../utils/config";
import { Controller } from "../../utils/types";
import { time } from "../../utils";
import { databaseService, jwtService } from "../../services";

const { time30days } = time;
const { checkUserInDB, updateRefreshTokenInDB } = databaseService;
const { verifyToken, generateTokens } = jwtService;

const refreshTokens: Controller = async (req, res) => {
  console.log("fired");
  try {
    const { refreshToken } = req.cookies as { refreshToken: string };
    const { userName } = req.body as { userName: string };
    console.log(refreshToken !== "" && "exists");
    
    if (!refreshToken) {
      return res.status(401).send({ error: "Refresh token missing" });
    }

    const token = verifyToken(refreshToken, config.publicKey!);
    if (!token) {
      return res.status(401).send({ error: "Invalid or expired refresh token" });
    }

    const user = await checkUserInDB("name", userName);
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    const tokens = generateTokens(refreshToken, config.privateKey!);

    updateRefreshTokenInDB(tokens.refreshToken);

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: time30days,
      secure: true,
    });

    res.send({
      message: "Token refreshed and user logged in successfully",
      userName: user?.name,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({ error: "Server error" });
  }
};
export { refreshTokens };
