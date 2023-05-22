"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const checkUser_1 = require("./checkUser");
const updateUserTokens_1 = require("./updateUserTokens");
const updateRefreshTokens_1 = require("./updateRefreshTokens");
const clearUserTokens_1 = require("./clearUserTokens");
const createUser_1 = require("./createUser");
exports.userControllers = {
    checkUserInDB: checkUser_1.checkUserInDB,
    updateUserTokensInDB: updateUserTokens_1.updateUserTokensInDB,
    updateRefreshTokenInDB: updateRefreshTokens_1.updateRefreshTokenInDB,
    clearUserTokensInDB: clearUserTokens_1.clearUserTokensInDB,
    handleCreateUser: createUser_1.handleCreateUser,
};
//# sourceMappingURL=index.js.map