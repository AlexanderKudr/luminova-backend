"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.images = void 0;
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const { addImageToCDN, addImageToFavorites, imagesForUser, imagesForNonUser, getCategoriesFromCDN, } = controllers_1.imagesControllers;
const images = (app) => {
    const baseURL = "/images";
    app.post(`${baseURL}/add`, addImageToCDN);
    app.post(`${baseURL}/favorites`, middlewares_1.verifyToken, addImageToFavorites);
    app.post(`${baseURL}/foruser`, imagesForUser);
    app.post(`${baseURL}/fornonuser`, imagesForNonUser);
    //
    app.get(`${baseURL}/categories`, getCategoriesFromCDN);
};
exports.images = images;
//# sourceMappingURL=images.js.map