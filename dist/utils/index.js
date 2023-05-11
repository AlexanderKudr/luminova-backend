"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.handleErrorDB = exports.handleDisconnectDB = exports.setupRoutes = exports.setupApp = exports.generateTokens = exports.time = exports.hashPassword = void 0;
const time_1 = require("./time");
Object.defineProperty(exports, "time", { enumerable: true, get: function () { return time_1.time; } });
const hashing_1 = require("./hashing");
Object.defineProperty(exports, "hashPassword", { enumerable: true, get: function () { return hashing_1.hashPassword; } });
const jwt_1 = require("./jwt");
Object.defineProperty(exports, "generateTokens", { enumerable: true, get: function () { return jwt_1.generateTokens; } });
const setup_1 = require("./setup");
Object.defineProperty(exports, "setupApp", { enumerable: true, get: function () { return setup_1.setupApp; } });
Object.defineProperty(exports, "setupRoutes", { enumerable: true, get: function () { return setup_1.setupRoutes; } });
const handleDB_1 = require("./handleDB");
Object.defineProperty(exports, "handleDisconnectDB", { enumerable: true, get: function () { return handleDB_1.handleDisconnectDB; } });
Object.defineProperty(exports, "handleErrorDB", { enumerable: true, get: function () { return handleDB_1.handleErrorDB; } });
Object.defineProperty(exports, "prisma", { enumerable: true, get: function () { return handleDB_1.prisma; } });
//# sourceMappingURL=index.js.map