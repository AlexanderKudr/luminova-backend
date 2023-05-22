"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesControllers = void 0;
const addToCDN_1 = require("./addToCDN");
const getImagesForNonUser_1 = require("./getImagesForNonUser");
const addToFavorites_1 = require("./addToFavorites");
const getImagesForUser_1 = require("./getImagesForUser");
exports.imagesControllers = {
    addImageToCDN: addToCDN_1.addImageToCDN,
    getImagesForNonUser: getImagesForNonUser_1.getImagesForNonUser,
    addImageToFavorites: addToFavorites_1.addImageToFavorites,
    getImagesForUser: getImagesForUser_1.getImagesForUser,
};
//# sourceMappingURL=index.js.map