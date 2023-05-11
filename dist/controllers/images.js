"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addImage = exports.getImages = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = require("../config");
cloudinary_1.v2.config(config_1.config.cloudinary);
const getImages = (req, res) => {
    cloudinary_1.v2.search
        .expression("folder:gallery")
        .sort_by("public_id", "desc")
        .max_results(30) //temporary fix //TODO: remove the max_results
        .execute()
        .then((result) => res.json(result));
};
exports.getImages = getImages;
const addImage = (req, res) => {
    const { title, url } = req.body;
    cloudinary_1.v2.uploader
        .upload(url, { use_filename: true, public_id: title, folder: "gallery" })
        .then((result) => res.json(result))
        .catch((err) => console.log(err));
};
exports.addImage = addImage;
//# sourceMappingURL=images.js.map