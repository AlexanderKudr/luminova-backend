"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseUtils = void 0;
const handleDB_1 = require("./handleDB");
const checkUser_1 = require("./checkUser");
const updateUserTokens_1 = require("./updateUserTokens");
const updateRefreshTokens_1 = require("./updateRefreshTokens");
const clearUserTokens_1 = require("./clearUserTokens");
const createUser_1 = require("./createUser");
exports.databaseUtils = {
    handleDisconnectDB: handleDB_1.handleDisconnectDB,
    handleErrorDB: handleDB_1.handleErrorDB,
    prisma: handleDB_1.prisma,
    checkUserInDB: checkUser_1.checkUserInDB,
    updateUserTokensInDB: updateUserTokens_1.updateUserTokensInDB,
    updateRefreshTokenInDB: updateRefreshTokens_1.updateRefreshTokenInDB,
    clearUserTokensInDB: clearUserTokens_1.clearUserTokensInDB,
    handleCreateUser: createUser_1.handleCreateUser,
};
//# sourceMappingURL=index.js.map