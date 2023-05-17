"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.images = void 0;
const images_1 = require("../../controllers/images");
const images = (app) => {
    const baseURL = "/images";
    app.get(`${baseURL}/all`, images_1.getImages);
    app.post(`${baseURL}/add`, images_1.addImageToCDN);
    app.post(`${baseURL}/favorites`, images_1.addImageToFavorites);
};
exports.images = images;
//# sourceMappingURL=images.js.map