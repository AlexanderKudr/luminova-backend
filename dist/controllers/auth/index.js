"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const logout_1 = require("./logout");
const protected_1 = require("./protected");
const refresh_1 = require("./refresh");
const register_1 = require("./register");
const login_1 = require("./login");
exports.authControllers = {
    register: register_1.register,
    login: login_1.login,
    logout: logout_1.logout,
    protectedAccess: protected_1.protectedAccess,
    refreshTokens: refresh_1.refreshTokens,
};
//# sourceMappingURL=index.js.map