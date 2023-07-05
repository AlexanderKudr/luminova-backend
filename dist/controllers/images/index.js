"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesControllers = void 0;
const uploadToCDN_1 = require("./uploadToCDN");
const addToFavorites_1 = require("./addToFavorites");
const imagesForUser_1 = require("./imagesForUser");
const imagesForNonUser_1 = require("./imagesForNonUser");
const getCategories_1 = require("./getCategories");
const getFavoriteImages_1 = require("./getFavoriteImages");
// import { getFavoriteImages } from "./getFavoriteImages";
exports.imagesControllers = {
    uploadToCDN: uploadToCDN_1.uploadToCDN,
    addImageToFavorites: addToFavorites_1.addImageToFavorites,
    imagesForUser: imagesForUser_1.imagesForUser,
    imagesForNonUser: imagesForNonUser_1.imagesForNonUser,
    getCategoriesFromCDN: getCategories_1.getCategoriesFromCDN,
    getFavoriteImages: getFavoriteImages_1.getFavoriteImages,
};
//# sourceMappingURL=index.js.map