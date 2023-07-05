"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.images = void 0;
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const { uploadToCDN, addImageToFavorites, imagesForUser, imagesForNonUser, getCategoriesFromCDN, getFavoriteImages } = controllers_1.imagesControllers;
const images = (app) => {
    const baseURL = "/images";
    app.post(`${baseURL}/add`, uploadToCDN);
    app.post(`${baseURL}/favorites`, middlewares_1.verifyToken, addImageToFavorites);
    app.post(`${baseURL}/foruser`, imagesForUser);
    app.post(`${baseURL}/fornonuser`, imagesForNonUser);
    app.post(`${baseURL}/getfavorites`, getFavoriteImages);
    //
    app.get(`${baseURL}/categories`, getCategoriesFromCDN);
};
exports.images = images;
//# sourceMappingURL=images.js.map