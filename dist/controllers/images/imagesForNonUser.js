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
exports.imagesForNonUser = void 0;
const lib_1 = require("../../lib");
const cloudinary_1 = require("cloudinary");
const imagesForNonUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, next_cursor } = req.body;
    try {
        const images = yield cloudinary_1.v2.search
            .expression(`folder:${category}`)
            .max_results(50)
            .next_cursor(next_cursor)
            .execute();
        res.send({ images: images.resources, pagePreview: (0, lib_1.pagePreview)(category) });
    }
    catch (error) {
        res.status(500).send({ error: "Category images could not be fetched" });
    }
});
exports.imagesForNonUser = imagesForNonUser;
//# sourceMappingURL=imagesForNonUser.js.map