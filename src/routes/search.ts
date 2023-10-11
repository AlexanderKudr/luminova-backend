import { Express } from "express";
import { searchControllers } from "../controllers";

const { retrieveSuggestions, searchImages } = searchControllers;

const search = (app: Express) => {
  const baseURL = "/search";

  app.get(`${baseURL}/suggestions`, retrieveSuggestions);
  app.get(`${baseURL}/images`, searchImages);
};

export { search };
