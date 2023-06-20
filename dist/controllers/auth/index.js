"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const logout_1 = require("./logout");
const refresh_1 = require("./refresh");
const register_1 = require("./register");
const login_1 = require("./login");
exports.authControllers = {
    register: register_1.register,
    login: login_1.login,
    logout: logout_1.logout,
    refreshTokens: refresh_1.refreshTokens,
};
//# sourceMappingURL=index.js.map