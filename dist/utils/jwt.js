"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("./index");
const generateTokens = (email, privateKey) => {
    const { time5minutes, time30days } = index_1.time;
    const algorithm = "RS256";
    const payload = { userEmail: email };
    const accessToken = jsonwebtoken_1.default.sign(payload, privateKey, {
        algorithm: algorithm,
        expiresIn: time5minutes,
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, privateKey, {
        algorithm: algorithm,
        expiresIn: time30days,
    });
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
//# sourceMappingURL=jwt.js.map