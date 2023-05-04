import { time } from "./time.js";
import { hashPassword } from "./hashing.js";
import { generateTokens } from "./jwt.js";
import { setupApp, setupRoutes } from "./setup.js";
import { handleDisconnectDB, handleErrorDB, prisma } from "./handleDB.js";

export {
  hashPassword,
  time,
  generateTokens,
  setupApp,
  setupRoutes,
  handleDisconnectDB,
  handleErrorDB,
  prisma,
};
