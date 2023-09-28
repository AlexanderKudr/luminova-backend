import { Express } from "express";
import { searchControllers } from "../controllers";

const { interactiveSearch, searchSuggestions } = searchControllers;

const search = (app: Express) => {
  const baseURL = "/search";
  // app.get(`${baseURL}/:query`, interactiveSearch);
  app.get(`${baseURL}/suggestions`, searchSuggestions);
};

export { search };
