import { addImageToCDN } from "./addToCDN";
import { addImageToFavorites } from "./addToFavorites";
import { imagesForUser } from "./imagesForUser";
import { imagesForNonUser } from "./imagesForNonUser";
import { getCategoriesFromCDN } from "./getCategories";

export const imagesControllers = {
  addImageToCDN,
  addImageToFavorites,
  imagesForUser,
  imagesForNonUser,
  getCategoriesFromCDN
};
