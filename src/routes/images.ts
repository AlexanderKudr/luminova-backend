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
  loadImagesIntoDB,
} = imagesControllers;

const images = (app: Express) => {
  const baseURL = "/images";

  app.post(`${baseURL}/upload`, uploadToProfile);
  app.post(`${baseURL}/updatefavorites`, verifyToken, updateFavoriteImages);
  app.post(`${baseURL}/foruser`, imagesForUser);
  app.post(`${baseURL}/fornonuser`, imagesForNonUser);
  app.post(`${baseURL}/getfavorites/:userName`, getFavoriteImages);
  app.post(`${baseURL}/getprofileimages/:userName`, getProfileImages);
  app.get(`${baseURL}/categories`, getCategoriesFromCDN);
  app.post(`${baseURL}/loadimages`, loadImagesIntoDB);
};

export { images };
