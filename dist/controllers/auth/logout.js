"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const prisma_1 = require("../prisma");
const logout = (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return res.status(401).send({ error: "Refresh token missing" });
    }
    (0, prisma_1.clearUserTokensInDB)(refreshToken);
    res.clearCookie("refreshToken");
    res.send({ message: "User logged out successfully" });
};
exports.logout = logout;
//# sourceMappingURL=logout.js.map