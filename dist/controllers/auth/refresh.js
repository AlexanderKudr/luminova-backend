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
exports.refreshTokens = void 0;
const keys_1 = require("../../config/keys");
const prisma_1 = require("../prisma");
const utils_1 = require("../../utils");
const { time30days } = utils_1.time;
const refreshTokens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    try {
        if (!refreshToken) {
            return res.status(401).send({ error: "Refresh token missing" });
        }
        const token = (0, utils_1.verifyToken)(refreshToken, keys_1.publicKey);
        if (!token) {
            return res.status(401).send({ error: "Invalid refresh token" });
        }
        const user = yield (0, prisma_1.checkUserInDB)("refreshToken", refreshToken);
        if (!user) {
            return res.status(401).send({ error: "User not found" });
        }
        const tokens = (0, utils_1.generateTokens)(refreshToken, keys_1.privateKey);
        (0, prisma_1.updateRefreshTokenInDB)(tokens.refreshToken);
        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: time30days,
        });
        res.send({
            message: "Token refreshed and user logged in successfully",
            user: yield (0, prisma_1.checkUserInDB)("email", refreshToken),
            accessToken: tokens.accessToken,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
    }
});
exports.refreshTokens = refreshTokens;
//# sourceMappingURL=refresh.js.map