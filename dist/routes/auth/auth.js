"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesAuth = void 0;
const auth_1 = require("../../controllers/auth");
const verifytoken_1 = require("../../middlewares/verifytoken");
const routesAuth = (app) => {
    const baseURL = "/auth";
    app.post(`${baseURL}/register`, auth_1.register);
    app.post(`${baseURL}/login`, auth_1.login);
    app.get(`${baseURL}/protected`, verifytoken_1.verifyToken, auth_1.protectedAccess);
    app.post(`${baseURL}/refresh`, verifytoken_1.verifyToken, auth_1.refreshTokens);
    app.post(`${baseURL}/logout`, auth_1.logout);
};
exports.routesAuth = routesAuth;
//# sourceMappingURL=auth.js.map