import { Express } from "express";
import { userControllers } from "../controllers";

const { updateUserData, downloadHistory } = userControllers;

const user = (app: Express) => {
  const baseURL = "/user";
  app.put(`${baseURL}/update`, updateUserData);
};

export { user };
