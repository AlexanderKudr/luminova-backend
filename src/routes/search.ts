import { Express } from "express";
import { searchControllers } from "../controllers";

const { retrieveSuggestions, searchImages, searchCollections, searchUsers } = searchControllers;

const search = (app: Express) => {
  const baseURL = "/search";

  app.get(`${baseURL}/suggestions`, retrieveSuggestions);
  app.get(`${baseURL}/images`, searchImages);
  app.get(`${baseURL}/collections`, searchCollections);
  app.get(`${baseURL}/users`, searchUsers);
};

export { search };
