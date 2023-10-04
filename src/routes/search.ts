import { Express } from "express";
import { searchControllers } from "../controllers";

const { searchForNonUser, retrieveSuggestions } = searchControllers;

const search = (app: Express) => {
  const baseURL = "/search";

  app.get(`${baseURL}/suggestions`, retrieveSuggestions);
  app.get(`${baseURL}/fornonuser`, searchForNonUser);
  app.post(`${baseURL}/foruser`, (req, res) => {
    console.log("coming soon");
  });
};

export { search };
