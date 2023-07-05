import { Express } from "express";
import { imagesControllers } from "../controllers";
import { verifyToken } from "../middlewares";

const {
  uploadToCDN,
  updateFavoriteImages,
  imagesForUser,
  imagesForNonUser,
  getCategoriesFromCDN,
  getFavoriteImages
} = imagesControllers;

const images = (app: Express) => {
  const baseURL = "/images";

  app.post(`${baseURL}/add`, uploadToCDN);
  app.post(`${baseURL}/updatefavorites`, verifyToken, updateFavoriteImages);
  app.post(`${baseURL}/foruser`, imagesForUser);
  app.post(`${baseURL}/fornonuser`, imagesForNonUser);
  app.post(`${baseURL}/getfavorites`, getFavoriteImages);
  //
  app.get(`${baseURL}/categories`, getCategoriesFromCDN);
};

export { images };
