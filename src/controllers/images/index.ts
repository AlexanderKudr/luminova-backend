import { uploadToCDN } from "./uploadToCDN";
import { updateFavoriteImages } from "./updateFavoriteImages";
import { imagesForUser } from "./imagesForUser";
import { imagesForNonUser } from "./imagesForNonUser";
import { getCategoriesFromCDN } from "./getCategories";
import { getFavoriteImages } from "./getFavoriteImages";
// import { getFavoriteImages } from "./getFavoriteImages";

export const imagesControllers = {
  uploadToCDN,
  updateFavoriteImages,
  imagesForUser,
  imagesForNonUser,
  getCategoriesFromCDN,
  getFavoriteImages,
};
