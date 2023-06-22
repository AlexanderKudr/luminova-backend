import { Express } from "express";
import { imagesControllers } from "../controllers";
import { verifyToken } from "../middlewares";

const {
  addImageToCDN,
  addImageToFavorites,
  imagesForUser,
  imagesForNonUser,
  getCategoriesFromCDN,
} = imagesControllers;

const images = (app: Express) => {
  const baseURL = "/images";

  app.post(`${baseURL}/add`, addImageToCDN);
  app.post(`${baseURL}/favorites`, verifyToken, addImageToFavorites);
  app.post(`${baseURL}/foruser`, imagesForUser);
  app.post(`${baseURL}/fornonuser`, imagesForNonUser);
  //
  app.get(`${baseURL}/categories`, getCategoriesFromCDN);
};

export { images };
