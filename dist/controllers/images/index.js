"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesControllers = void 0;
const addToCDN_1 = require("./addToCDN");
const addToFavorites_1 = require("./addToFavorites");
const imagesForUser_1 = require("./imagesForUser");
const imagesForNonUser_1 = require("./imagesForNonUser");
exports.imagesControllers = {
    addImageToCDN: addToCDN_1.addImageToCDN,
    addImageToFavorites: addToFavorites_1.addImageToFavorites,
    imagesForUser: imagesForUser_1.imagesForUser,
    imagesForNonUser: imagesForNonUser_1.imagesForNonUser,
};
//# sourceMappingURL=index.js.map