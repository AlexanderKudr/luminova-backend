"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addImageToCDN = void 0;
const cloudinary_1 = require("cloudinary");
const addImageToCDN = (req, res) => {
    const { title, url } = req.body;
    cloudinary_1.v2.uploader
        .upload(url, { use_filename: true, public_id: title, folder: "gallery" })
        .then((result) => res.json(result))
        .catch((err) => console.log(err));
};
exports.addImageToCDN = addImageToCDN;
//# sourceMappingURL=addToCDN.js.map