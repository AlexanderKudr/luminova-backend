import { time } from "./time";
import { hashPassword } from "./hashing";
import { generateTokens } from "./jwt";
import { setupApp, setupRoutes } from "./setup";
import { handleDisconnectDB, handleErrorDB, prisma } from "./handleDB";

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
