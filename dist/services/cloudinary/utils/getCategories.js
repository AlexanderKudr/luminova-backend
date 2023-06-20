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
exports.getCategoriesFromCDN = void 0;
const cloudinary_1 = require("cloudinary");
const getCategoriesFromCDN = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploadResult = yield cloudinary_1.v2.api.root_folders();
        res.json(uploadResult);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error adding image to Cloudinary");
    }
});
exports.getCategoriesFromCDN = getCategoriesFromCDN;
//# sourceMappingURL=getCategories.js.map