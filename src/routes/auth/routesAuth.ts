import { Express } from "express";
import { login, register } from "./controllers.js";


const routesAuth = (app: Express) => {
  const baseURL = "/auth";
  app.post(`${baseURL}/register`, register);
  app.delete(`${baseURL}/login`, login);
};

export { routesAuth };
