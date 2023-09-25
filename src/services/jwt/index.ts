import { hashPassword, bcrypt } from "./hashing";
import { generateTokens, jwt } from "./jwt";

export const jwtService = { hashPassword, generateTokens, bcrypt, jwt };
