import { Express } from "express";
import { addImage, getImages } from "@controllers/images";

const routesImages = (app: Express) => {
  const baseURL = "/api/images";
  app.get(baseURL, getImages);
  app.post(baseURL, addImage);
};

export { routesImages };
