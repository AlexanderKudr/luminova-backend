var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../config/index.js";
import { checkUserInDB, handleCreateUser, updateUserTokensInDB, updateRefreshTokenInDB, clearUserTokensInDB, } from "../controllers/prisma.js";
import { generateTokens, hashPassword, time } from "../utils/index.js";
const { time30days } = time;
const { privateKey, publicKey } = config;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield checkUserInDB("email", email);
    if (user !== null && user !== undefined) {
        return res.status(400).send({ error: "User with this email already exists" });
    }
    const { accessToken, refreshToken } = generateTokens(email, privateKey);
    const newUser = {
        email: email,
        password: yield hashPassword(password),
        accessToken: accessToken,
        refreshToken: refreshToken,
        favoriteImages: [],
    };
    yield handleCreateUser(newUser);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: time30days,
    });
    res.send({
        message: "User registered successfully",
        user: yield checkUserInDB("email", email),
    });
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield checkUserInDB("email", email);
    if (!user) {
        return res.status(401).send({ error: "Invalid email or password" });
    }
    const passwordMatches = yield bcrypt.compare(password, user.password);
    if (passwordMatches) {
        const { accessToken, refreshToken } = generateTokens(email, privateKey);
        updateUserTokensInDB({ email, accessToken, refreshToken });
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
const protectedAccess = (req, res) => {
    try {
        res.send({ message: "Protected access successfully" });
    }
    catch (error) {
        res.status(500).send({ error: "Protected access error" });
    }
};
const refreshTokens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    try {
        if (!refreshToken) {
            return res.status(401).send({ error: "Refresh token missing" });
        }
        const veryfyToken = jwt.verify(refreshToken, publicKey);
        if (!veryfyToken) {
            return res.status(401).send({ error: "Invalid refresh token" });
        }
        const user = yield checkUserInDB("refreshToken", refreshToken);
        if (!user) {
            return res.status(401).send({ error: "User not found" });
        }
        const tokens = generateTokens(refreshToken, privateKey);
        updateRefreshTokenInDB(tokens.refreshToken);
        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: time30days,
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
const logout = (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return res.status(401).send({ error: "Refresh token missing" });
    }
    clearUserTokensInDB(refreshToken);
    res.clearCookie("refreshToken");
    res.send({ message: "User logged out successfully" });
};
export { register, login, protectedAccess, refreshTokens, logout };
//# sourceMappingURL=auth.js.map