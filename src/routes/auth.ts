import { Express } from "express";
import { authControllers } from "../controllers";

const { register, login, logout, refreshTokens } = authControllers;

const auth = (app: Express) => {
  const baseURL = "/auth";
  app.post(`${baseURL}/register`, register);
  app.post(`${baseURL}/login`, login);
  app.post(`${baseURL}/refresh`, refreshTokens);
  app.post(`${baseURL}/logout`, logout);
};

export { auth };
