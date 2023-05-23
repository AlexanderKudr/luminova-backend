import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { Middleware } from "../types/middlewares";
import { config } from "../config";
import { userControllers } from "../controllers";
import { generateTokens } from "../utils";
import { time } from "../utils";

const { time30days } = time;
const { privateKey, publicKey } = config;
const { checkUserInDB, updateRefreshTokenInDB } = userControllers;

const verifyToken: Middleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "Access token is missing" });
  }

  try {
    const decodedToken = jwt_decode<any>(token);

    if (decodedToken.exp < Date.now() / 1000) {
      const { refreshToken } = req.cookies as { refreshToken: string };
      console.log(refreshToken, "refreshToken");

      if (!refreshToken) {
        return res.status(401).send({ error: "Refresh token missing" });
      }

      const user = await checkUserInDB("refreshToken", refreshToken);
      if (!user) {
        return res.status(401).send({ error: "User not found" });
      }

      const tokens = generateTokens(refreshToken, privateKey!);

      updateRefreshTokenInDB(tokens.refreshToken);

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: false,
        // sameSite: "lax",
        maxAge: time30days,
      });

      req.headers.authorization = `Bearer ${tokens.accessToken}`;
    }

    jwt.verify(token, publicKey!);
  } catch (error) {
    return res.status(401).send({ error: "Invalid Access Token" });
  }
  next();
};

export { verifyToken };
