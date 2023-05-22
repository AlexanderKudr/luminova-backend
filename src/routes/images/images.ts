import { Express } from "express";
import { imagesControllers } from "../../controllers";
import { verifyToken } from "../../middlewares/verifytoken";

const { addImageToCDN, getImagesForNonUser, addImageToFavorites, getImagesForUser } =
  imagesControllers;

const images = (app: Express) => {
  const baseURL = "/images";
  app.get(`${baseURL}/all`, getImagesForNonUser);
  app.post(`${baseURL}/allforuser`, getImagesForUser);
  app.post(`${baseURL}/add`, addImageToCDN);
  app.post(`${baseURL}/favorites`, verifyToken, addImageToFavorites);
};

export { images };
