"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImages = void 0;
const cloudinary_1 = require("cloudinary");
const getImages = (req, res) => {
    cloudinary_1.v2.search
        .expression("folder:gallery")
        .sort_by("public_id", "desc")
        .max_results(30) //temporary fix //TODO: remove the max_results
        .execute()
        .then((result) => res.json(result));
};
exports.getImages = getImages;
//# sourceMappingURL=getAll.js.map