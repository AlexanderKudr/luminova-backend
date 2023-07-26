import { Express } from "express";
import { userControllers } from "../controllers";

const { updateUserData, downloadHistory } = userControllers;

const user = (app: Express) => {
  const baseURL = "/user";
  //   app.get(`${baseURL}/profile`, getProfile);
};

export { user };
