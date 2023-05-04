import jwt from "jsonwebtoken";
import { time } from "./index.js";



const generateTokens = (email: string, privateKey: string) => {
  const { time5minutes, time30days } = time;
  const algorithm = "RS256";
  const payload = { userEmail: email };

  const accessToken = jwt.sign(payload, privateKey, {
    algorithm: algorithm,
    expiresIn: time5minutes,
  });

  const refreshToken = jwt.sign(payload, privateKey, {
    algorithm: algorithm,
    expiresIn: time30days,
  });

  return { accessToken, refreshToken };
};

export { generateTokens };
