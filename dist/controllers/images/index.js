"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesControllers = void 0;
const updateFavoriteImages_1 = require("./updateFavoriteImages");
const imagesForUser_1 = require("./imagesForUser");
const imagesForNonUser_1 = require("./imagesForNonUser");
const getCategories_1 = require("./getCategories");
const getFavoriteImages_1 = require("./getFavoriteImages");
// import { getFavoriteImages } from "./getFavoriteImages";
exports.imagesControllers = {
    updateFavoriteImages: updateFavoriteImages_1.updateFavoriteImages,
    imagesForUser: imagesForUser_1.imagesForUser,
    imagesForNonUser: imagesForNonUser_1.imagesForNonUser,
    getCategoriesFromCDN: getCategories_1.getCategoriesFromCDN,
    getFavoriteImages: getFavoriteImages_1.getFavoriteImages,
};
//# sourceMappingURL=index.js.map