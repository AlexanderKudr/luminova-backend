"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokens = exports.protectedAccess = exports.logout = exports.login = exports.register = void 0;
const logout_1 = require("./logout");
Object.defineProperty(exports, "logout", { enumerable: true, get: function () { return logout_1.logout; } });
const protected_1 = require("./protected");
Object.defineProperty(exports, "protectedAccess", { enumerable: true, get: function () { return protected_1.protectedAccess; } });
const refresh_1 = require("./refresh");
Object.defineProperty(exports, "refreshTokens", { enumerable: true, get: function () { return refresh_1.refreshTokens; } });
const register_1 = require("./register");
Object.defineProperty(exports, "register", { enumerable: true, get: function () { return register_1.register; } });
const login_1 = require("./login");
Object.defineProperty(exports, "login", { enumerable: true, get: function () { return login_1.login; } });
//# sourceMappingURL=index.js.map