import jwt from "jsonwebtoken";
import { privateKey } from "./keys/privateKey.js";
import { publicKey } from "./keys/publicKey.js";

const signJWT = (payload: object, expiresIn: string | number) => {
  return jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: expiresIn,
  });
};

const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, publicKey);
    return { payload: decoded, expired: false };
  } catch (error: any) {
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
};
export { signJWT, verifyJWT };
