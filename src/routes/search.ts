import { Express } from "express";
import { searchControllers } from "../controllers";

const { interactiveSearch } = searchControllers;

const search = (app: Express) => {
  const baseURL = "/search";
  app.get(`${baseURL}/:query`, interactiveSearch);
};

export { search };
