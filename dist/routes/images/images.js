"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.images = void 0;
const controllers_1 = require("../../controllers");
const images = (app) => {
    const baseURL = "/images";
    app.get(`${baseURL}/all`, controllers_1.getImagesForNonUser);
    app.post(`${baseURL}/allforuser`, controllers_1.getImagesForUser);
    app.post(`${baseURL}/add`, controllers_1.addImageToCDN);
    app.post(`${baseURL}/favorites`, controllers_1.addImageToFavorites);
};
exports.images = images;
//# sourceMappingURL=images.js.map