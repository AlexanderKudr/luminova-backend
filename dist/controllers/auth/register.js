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
const index_1 = require("../index");
const { time30days } = utils_1.time;
const { checkUserInDB, handleCreateUser } = index_1.userControllers;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    const user = yield checkUserInDB("email", email);
    if (user !== null && user !== undefined) {
        return res.status(400).send({ error: "User with this email already exists" });
    }
    const { accessToken, refreshToken } = (0, utils_1.generateTokens)(email, keys_1.privateKey);
    const newUser = {
        name: name,
        email: email,
        password: yield (0, utils_1.hashPassword)(password),
        accessToken: accessToken,
        refreshToken: refreshToken,
        confirmedemail: false,
        favoriteImages: [],
    };
    yield handleCreateUser(newUser);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        // sameSite: "none",
        maxAge: time30days,
    });
    res.send({
        message: "User registered successfully",
        accessToken: accessToken,
        name: name,
    });
});
exports.register = register;
//# sourceMappingURL=register.js.map