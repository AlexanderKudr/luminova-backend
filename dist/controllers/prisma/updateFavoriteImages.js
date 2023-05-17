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
exports.addFavoriteImage = exports.deleteFavoriteImage = exports.findFavoriteImage = void 0;
const utils_1 = require("../../utils");
const findFavoriteImage = (imageUrl, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const { favoriteImages } = utils_1.prisma;
    const existingFavoriteImage = yield favoriteImages.findUnique({
        where: {
            user_email_image_url: {
                user_email: userEmail,
                image_url: imageUrl,
            },
        },
    });
    return existingFavoriteImage;
});
exports.findFavoriteImage = findFavoriteImage;
const deleteFavoriteImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { favoriteImages } = utils_1.prisma;
    yield favoriteImages.delete({
        where: { id },
    });
});
exports.deleteFavoriteImage = deleteFavoriteImage;
const addFavoriteImage = (imageUrl, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    yield utils_1.prisma.user.update({
        where: { email: userEmail },
        data: {
            favoriteImages: {
                create: { image_url: imageUrl },
            },
        },
    });
});
exports.addFavoriteImage = addFavoriteImage;
//# sourceMappingURL=updateFavoriteImages.js.map