import { Express } from "express";
import { login, protectedAccess, refreshTokens, register, logout } from "../../controllers";
import { verifyToken } from "../../middlewares/verifytoken";

const auth = (app: Express) => {
  const baseURL = "/auth";
  app.post(`${baseURL}/register`, register);
  app.post(`${baseURL}/login`, login);
  app.get(`${baseURL}/protected`, verifyToken, protectedAccess);
  app.post(`${baseURL}/refresh`, verifyToken, refreshTokens);
  app.post(`${baseURL}/logout`, logout);
};

export { auth };
