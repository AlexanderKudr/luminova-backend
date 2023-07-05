import { hashPassword } from "./hashing";
import { generateTokens, verifyToken } from "./jwt";

export const jwtService = { hashPassword, generateTokens, verifyToken };
