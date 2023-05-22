"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.images = void 0;
const controllers_1 = require("../../controllers");
const verifytoken_1 = require("../../middlewares/verifytoken");
const { addImageToCDN, getImagesForNonUser, addImageToFavorites, getImagesForUser } = controllers_1.imagesControllers;
const images = (app) => {
    const baseURL = "/images";
    app.get(`${baseURL}/all`, getImagesForNonUser);
    app.post(`${baseURL}/allforuser`, getImagesForUser);
    app.post(`${baseURL}/add`, addImageToCDN);
    app.post(`${baseURL}/favorites`, verifytoken_1.verifyToken, addImageToFavorites);
};
exports.images = images;
//# sourceMappingURL=images.js.map