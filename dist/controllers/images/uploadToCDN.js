"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCDN = void 0;
const cloudinary_1 = require("cloudinary");
const uploadToCDN = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, url } = req.body;
    try {
        const uploadResult = yield cloudinary_1.v2.uploader.upload(url, {
            use_filename: true,
            public_id: title,
            folder: "gallery",
        });
        const contextResult = (yield cloudinary_1.v2.uploader.add_context("favorite=false", [uploadResult.public_id]));
        res.json(contextResult);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error adding image to Cloudinary");
    }
});
exports.uploadToCDN = uploadToCDN;
//# sourceMappingURL=uploadToCDN.js.map