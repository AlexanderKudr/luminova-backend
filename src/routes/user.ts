import { Express } from "express";
import { userControllers } from "../controllers";

const { updateUserData } = userControllers;

const user = (app: Express) => {
  const baseURL = "/user";
  //   app.get(`${baseURL}/profile`, getProfile);
};

export { user };
