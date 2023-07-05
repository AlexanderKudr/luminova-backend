import { uploadToCDN } from "./uploadToCDN";
import { addImageToFavorites } from "./addToFavorites";
import { imagesForUser } from "./imagesForUser";
import { imagesForNonUser } from "./imagesForNonUser";
import { getCategoriesFromCDN } from "./getCategories";
import { getFavoriteImages } from "./getFavoriteImages";
// import { getFavoriteImages } from "./getFavoriteImages";

export const imagesControllers = {
  uploadToCDN,
  addImageToFavorites,
  imagesForUser,
  imagesForNonUser,
  getCategoriesFromCDN,
  getFavoriteImages,
};
