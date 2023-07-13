import { Express } from "express";
import { imagesControllers } from "../controllers";
import { verifyToken } from "../middlewares";

const {
  uploadToProfile,
  updateFavoriteImages,
  imagesForUser,
  imagesForNonUser,
  getCategoriesFromCDN,
  getFavoriteImages,
  getProfileImages,
} = imagesControllers;

const images = (app: Express) => {
  const baseURL = "/images";
  app.post(`${baseURL}/upload`, uploadToProfile);
  app.post(`${baseURL}/updatefavorites`, verifyToken, updateFavoriteImages);
  app.post(`${baseURL}/foruser`, imagesForUser);
  app.post(`${baseURL}/fornonuser`, imagesForNonUser);
  app.post(`${baseURL}/getfavorites`, getFavoriteImages);
  app.post(`${baseURL}/getprofileimages`, getProfileImages);
  app.get(`${baseURL}/categories`, getCategoriesFromCDN);
};

export { images };
