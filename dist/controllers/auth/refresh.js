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
const config_1 = require("../../config");
const utils_1 = require("../../utils");
const { time30days } = utils_1.time;
const { checkUserInDB, updateRefreshTokenInDB } = utils_1.databaseUtils;
const { verifyToken, generateTokens } = utils_1.jwtUtils;
const refreshTokens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(401).send({ error: "Refresh token missing" });
        }
        const token = verifyToken(refreshToken, config_1.publicKey);
        if (!token) {
            return res.status(401).send({ error: "Invalid or expired refresh token" });
        }
        const user = yield checkUserInDB("refreshToken", refreshToken);
        if (!user) {
            return res.status(401).send({ error: "User not found" });
        }
        const tokens = generateTokens(refreshToken, config_1.privateKey);
        updateRefreshTokenInDB(tokens.refreshToken);
        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: time30days,
            secure: true,
        });
        res.send({
            message: "Token refreshed and user logged in successfully",
            user: yield checkUserInDB("email", refreshToken),
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