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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const config_1 = require("../config");
const controllers_1 = require("../controllers");
const utils_1 = require("../utils");
const utils_2 = require("../utils");
const { time30days } = utils_2.time;
const { privateKey, publicKey } = config_1.config;
const { checkUserInDB, updateRefreshTokenInDB } = controllers_1.userControllers;
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).send({ error: "Access token is missing" });
    }
    try {
        const decodedToken = (0, jwt_decode_1.default)(token);
        if (decodedToken.exp < Date.now() / 1000) {
            const { refreshToken } = req.cookies;
            console.log(refreshToken, "refreshToken");
            if (!refreshToken) {
                return res.status(401).send({ error: "Refresh token missing" });
            }
            const user = yield checkUserInDB("refreshToken", refreshToken);
            if (!user) {
                return res.status(401).send({ error: "User not found" });
            }
            const tokens = (0, utils_1.generateTokens)(refreshToken, privateKey);
            updateRefreshTokenInDB(tokens.refreshToken);
            res.cookie("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: false,
                // sameSite: "lax",
                maxAge: time30days,
            });
            req.headers.authorization = `Bearer ${tokens.accessToken}`;
        }
        jsonwebtoken_1.default.verify(token, publicKey);
    }
    catch (error) {
        return res.status(401).send({ error: "Invalid Access Token" });
    }
    next();
});
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifytoken.js.map