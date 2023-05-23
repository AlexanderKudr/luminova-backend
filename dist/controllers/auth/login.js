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
exports.login = void 0;
const keys_1 = require("../../config/keys");
const utils_1 = require("../../utils");
const index_1 = require("../index");
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_2 = require("../../utils");
const { time30days } = utils_2.time;
const { checkUserInDB, updateUserTokensInDB } = index_1.userControllers;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield checkUserInDB("email", email);
    if (!user) {
        return res.status(401).send({ error: "Invalid email or password" });
    }
    const passwordMatches = yield bcrypt_1.default.compare(password, user.password);
    if (passwordMatches) {
        const { accessToken, refreshToken } = (0, utils_1.generateTokens)(email, keys_1.privateKey);
        updateUserTokensInDB({ email, accessToken, refreshToken });
        console.log("about to set cookie");
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            // sameSite: "lax",
            maxAge: time30days,
        });
        res.send({
            message: `User ${user === null || user === void 0 ? void 0 : user.email} logged in successfully`,
            accessToken,
            name: user === null || user === void 0 ? void 0 : user.name,
        });
    }
    else {
        res.status(401).send({ error: "Invalid email or password" });
    }
});
exports.login = login;
//# sourceMappingURL=login.js.map