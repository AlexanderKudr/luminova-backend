import { Express } from "express";
import { getImages, addImageToCDN, addImageToFavorites } from "../../controllers/images";

const images = (app: Express) => {
  const baseURL = "/images";
  app.get(`${baseURL}/all`, getImages);
  app.post(`${baseURL}/add`, addImageToCDN);
  app.post(`${baseURL}/favorites`, addImageToFavorites);
};

export { images };
