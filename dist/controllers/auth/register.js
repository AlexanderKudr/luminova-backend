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
exports.register = void 0;
const keys_1 = require("../../config/keys");
const utils_1 = require("../../utils");
const prisma_1 = require("../prisma");
const { time30days } = utils_1.time;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, prisma_1.checkUserInDB)("email", email);
    if (user !== null && user !== undefined) {
        return res.status(400).send({ error: "User with this email already exists" });
    }
    const { accessToken, refreshToken } = (0, utils_1.generateTokens)(email, keys_1.privateKey);
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
        secure: false,
        sameSite: "none",
        maxAge: time30days,
    });
    res.send({
        message: "User registered successfully",
        accessToken: accessToken,
    });
});
exports.register = register;
//# sourceMappingURL=register.js.map