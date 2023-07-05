"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const hashing_1 = require("./hashing");
const jwt_1 = require("./jwt");
exports.jwtService = { hashPassword: hashing_1.hashPassword, generateTokens: jwt_1.generateTokens, verifyToken: jwt_1.verifyToken };
//# sourceMappingURL=index.js.map