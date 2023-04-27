import { Express } from "express";
import { login, register } from "../../controllers/auth.js";


const routesAuth = (app: Express) => {
  const baseURL = "/auth";
  app.post(`${baseURL}/register`, register);
  app.delete(`${baseURL}/login`, login);
};
const routesImages = (app: Express) => {
  const baseURL = "/images";
  app.use(baseURL, routesImages);
}
export { routesAuth };
