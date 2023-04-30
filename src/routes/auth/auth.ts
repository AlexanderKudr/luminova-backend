import { Express } from "express";
import { login, protectedAccess, refreshTokens, register } from "../../controllers/auth.js";
import { verifyToken } from "../../middlewares/verifytoken.js";

const routesAuth = (app: Express) => {
  const baseURL = "/auth";
  app.post(`${baseURL}/register`, register);
  app.post(`${baseURL}/login`, login);
  app.get(`${baseURL}/protected`, verifyToken, protectedAccess);
  app.post(`${baseURL}/refresh`, verifyToken, refreshTokens);
  app.post(`${baseURL}/logout`);
};

export { routesAuth };
