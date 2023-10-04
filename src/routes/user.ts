import { Express } from "express";
import { userControllers } from "../controllers";

const { updateProfileData, getProfileData, changePassword, closeAccount } = userControllers;

const user = (app: Express) => {
  const baseURL = "/user";

  app.put(`${baseURL}/updateprofiledata`, updateProfileData);
  app.get(`${baseURL}/getprofiledata`, getProfileData);
  app.put(`${baseURL}/changepassword`, changePassword);
  app.post(`${baseURL}/closeaccount`, closeAccount);
};

export { user };
