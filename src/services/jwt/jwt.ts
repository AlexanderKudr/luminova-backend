import jwt from "jsonwebtoken";
import { constants } from "../../utils";

const { time } = constants;
const { time5minutes, time30days } = time;

const generateTokens = (email: string, privateKey: string) => {
  const algorithm = "RS256";//check xxhash64
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

const verifyToken = (refreshToken: string, publicKey: string) => {
  return jwt.verify(refreshToken, publicKey);
};

export { generateTokens, verifyToken };
