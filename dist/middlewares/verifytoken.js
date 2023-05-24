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
const jwt_decode_1 = __importDefault(require("jwt-decode"));
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
            return res.status(401).send({ error: "Access token expired" });
        }
    }
    catch (error) {
        return res.status(401).send({ error: "Invalid Access Token" });
    }
    next();
});
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifytoken.js.map