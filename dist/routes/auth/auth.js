import { login, protectedAccess, refreshTokens, register, logout } from "../../controllers/auth.js";
import { verifyToken } from "../../middlewares/verifytoken.js";
const routesAuth = (app) => {
    const baseURL = "/auth";
    app.post(`${baseURL}/register`, register);
    app.post(`${baseURL}/login`, login);
    app.get(`${baseURL}/protected`, verifyToken, protectedAccess);
    app.post(`${baseURL}/refresh`, verifyToken, refreshTokens);
    app.post(`${baseURL}/logout`, logout);
};
export { routesAuth };
//# sourceMappingURL=auth.js.map