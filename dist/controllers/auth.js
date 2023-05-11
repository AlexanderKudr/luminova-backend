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
exports.logout = exports.refreshTokens = exports.protectedAccess = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const prisma_1 = require("../controllers/prisma");
const utils_1 = require("../utils");
const { time30days } = utils_1.time;
const { privateKey, publicKey } = config_1.config;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, prisma_1.checkUserInDB)("email", email);
    if (user !== null && user !== undefined) {
        return res.status(400).send({ error: "User with this email already exists" });
    }
    const { accessToken, refreshToken } = (0, utils_1.generateTokens)(email, privateKey);
    const newUser = {
        email: email,
        password: yield (0, utils_1.hashPassword)(password),
        accessToken: accessToken,
        refreshToken: refreshToken,
        favoriteImages: [],
    };
    yield (0, prisma_1.handleCreateUser)(newUser);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: time30days,
    });
    res.send({
        message: "User registered successfully",
        user: yield (0, prisma_1.checkUserInDB)("email", email),
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, prisma_1.checkUserInDB)("email", email);
    if (!user) {
        return res.status(401).send({ error: "Invalid email or password" });
    }
    const passwordMatches = yield bcrypt_1.default.compare(password, user.password);
    if (passwordMatches) {
        const { accessToken, refreshToken } = (0, utils_1.generateTokens)(email, privateKey);
        (0, prisma_1.updateUserTokensInDB)({ email, accessToken, refreshToken });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: time30days,
        });
        res.send({
            message: `User ${user === null || user === void 0 ? void 0 : user.email} logged in successfully`,
            accessToken,
        });
    }
    else {
        res.status(401).send({ error: "Invalid email or password" });
    }
});
exports.login = login;
const protectedAccess = (req, res) => {
    try {
        res.send({ message: "Protected access successfully" });
    }
    catch (error) {
        res.status(500).send({ error: "Protected access error" });
    }
};
exports.protectedAccess = protectedAccess;
const refreshTokens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    try {
        if (!refreshToken) {
            return res.status(401).send({ error: "Refresh token missing" });
        }
        const veryfyToken = jsonwebtoken_1.default.verify(refreshToken, publicKey);
        if (!veryfyToken) {
            return res.status(401).send({ error: "Invalid refresh token" });
        }
        const user = yield (0, prisma_1.checkUserInDB)("refreshToken", refreshToken);
        if (!user) {
            return res.status(401).send({ error: "User not found" });
        }
        const tokens = (0, utils_1.generateTokens)(refreshToken, privateKey);
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
const logout = (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return res.status(401).send({ error: "Refresh token missing" });
    }
    (0, prisma_1.clearUserTokensInDB)(refreshToken);
    res.clearCookie("refreshToken");
    res.send({ message: "User logged out successfully" });
};
exports.logout = logout;
//# sourceMappingURL=auth.js.map