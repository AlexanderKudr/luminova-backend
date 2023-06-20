"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtUtils = void 0;
const hashing_1 = require("./hashing");
const jwt_1 = require("./jwt");
exports.jwtUtils = { hashPassword: hashing_1.hashPassword, generateTokens: jwt_1.generateTokens, verifyToken: jwt_1.verifyToken };
//# sourceMappingURL=index.js.map