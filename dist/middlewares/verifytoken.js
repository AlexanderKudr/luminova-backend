"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).send({ error: "Access token is missing" });
    }
    try {
        jsonwebtoken_1.default.verify(token, config_1.config.publicKey);
    }
    catch (error) {
        return res.status(401).send({ error: "Invalid Access Token" });
    }
    next();
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifytoken.js.map