"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesImages = void 0;
const images_1 = require("../../controllers/images");
const routesImages = (app) => {
    const baseURL = "/api/images";
    app.get(baseURL, images_1.getImages);
    app.post(baseURL, images_1.addImage);
};
exports.routesImages = routesImages;
//# sourceMappingURL=images.js.map