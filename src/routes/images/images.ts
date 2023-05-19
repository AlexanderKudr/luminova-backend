import { Express } from "express";
import {
  getImagesForNonUser,
  addImageToCDN,
  addImageToFavorites,
  getImagesForUser,
} from "../../controllers";

const images = (app: Express) => {
  const baseURL = "/images";
  app.get(`${baseURL}/all`, getImagesForNonUser);
  app.post(`${baseURL}/allforuser`, getImagesForUser);
  app.post(`${baseURL}/add`, addImageToCDN);
  app.post(`${baseURL}/favorites`, addImageToFavorites);
};

export { images };
