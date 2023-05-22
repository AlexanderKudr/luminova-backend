import { Express } from "express";
import { authControllers } from "../../controllers";
import { verifyToken } from "../../middlewares/verifytoken";

const { register, login, logout, protectedAccess, refreshTokens } = authControllers;

const auth = (app: Express) => {
  const baseURL = "/auth";
  app.post(`${baseURL}/register`, register);
  app.post(`${baseURL}/login`, login);
  app.get(`${baseURL}/protected`, verifyToken, protectedAccess);
  app.post(`${baseURL}/refresh`, refreshTokens);
  app.post(`${baseURL}/logout`, logout);
};

export { auth };
