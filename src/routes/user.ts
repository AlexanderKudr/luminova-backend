import { Express } from "express";
import { userControllers } from "../controllers";

const { updateUserData, getUserData } = userControllers;

const user = (app: Express) => {
  const baseURL = "/user";
  app.put(`${baseURL}/update`, updateUserData);
  app.get(`${baseURL}/getprofiledata`, getUserData);
};

export { user };
