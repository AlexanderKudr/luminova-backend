import jwt from "jsonwebtoken";
import { privateKey } from "./keys/privateKey.js";
import { publicKey } from "./keys/publicKey.js";
import bcrypt from "bcrypt";
const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export { hashPassword };
