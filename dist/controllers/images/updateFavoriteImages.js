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
exports.updateFavoriteImages = void 0;
const services_1 = require("../../services");
const { handleDisconnectDB, prisma } = services_1.databaseService;
const updateFavoriteImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { public_id, accessToken } = req.body;
    const { user, favoriteImages } = prisma;
    try {
        if (!public_id || !accessToken) {
            res.status(400).send({ message: "public_id or accessToken is missing" });
            return;
        }
        const existingUser = yield user.findFirst({
            where: { accessToken: accessToken },
        });
        if (!existingUser) {
            res.status(400).send({ message: "User not found" });
            return;
        }
        const existingFavoriteImage = yield favoriteImages.findFirst({
            where: { public_id: public_id, user_id: existingUser === null || existingUser === void 0 ? void 0 : existingUser.id },
        });
        if (existingFavoriteImage) {
            yield favoriteImages.delete({
                where: { id: existingFavoriteImage.id },
            });
            res.send({ message: "Favorite image removed successfully" });
            return;
        }
        yield favoriteImages.create({
            data: {
                public_id: public_id,
                User: { connect: { id: existingUser === null || existingUser === void 0 ? void 0 : existingUser.id } },
            },
        });
        res.send({ message: "Favorite image added successfully" });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "Internal server error, adding/deleting image to favorites failed" });
    }
    finally {
        handleDisconnectDB();
    }
});
exports.updateFavoriteImages = updateFavoriteImages;
//# sourceMappingURL=updateFavoriteImages.js.map