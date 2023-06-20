import { hashPassword } from "./hashing";
import { generateTokens, verifyToken } from "./jwt";

export const jwtUtils = { hashPassword, generateTokens, verifyToken };
