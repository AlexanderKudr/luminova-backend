"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const utils_1 = require("../../utils");
const { clearUserTokensInDB } = utils_1.databaseUtils;
const logout = (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return res.status(401).send({ error: "Refresh token missing" });
    }
    clearUserTokensInDB(refreshToken);
    res.clearCookie("refreshToken");
    res.send({ message: "User logged out successfully" });
};
exports.logout = logout;
//# sourceMappingURL=logout.js.map