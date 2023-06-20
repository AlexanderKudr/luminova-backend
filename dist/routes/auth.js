"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const controllers_1 = require("../controllers");
const { register, login, logout, refreshTokens } = controllers_1.authControllers;
const auth = (app) => {
    const baseURL = "/auth";
    app.post(`${baseURL}/register`, register);
    app.post(`${baseURL}/login`, login);
    app.post(`${baseURL}/refresh`, refreshTokens);
    app.post(`${baseURL}/logout`, logout);
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map