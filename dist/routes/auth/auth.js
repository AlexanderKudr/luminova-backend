"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const controllers_1 = require("../../controllers");
const verifytoken_1 = require("../../middlewares/verifytoken");
const auth = (app) => {
    const baseURL = "/auth";
    app.post(`${baseURL}/register`, controllers_1.register);
    app.post(`${baseURL}/login`, controllers_1.login);
    app.get(`${baseURL}/protected`, verifytoken_1.verifyToken, controllers_1.protectedAccess);
    app.post(`${baseURL}/refresh`, verifytoken_1.verifyToken, controllers_1.refreshTokens);
    app.post(`${baseURL}/logout`, controllers_1.logout);
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map