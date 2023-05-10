"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = exports.setupRoutes = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = require("@/config");
const routes_1 = require("@/routes");
const { corsOptions, port } = config_1.config;
const setupRoutes = (app) => {
    (0, routes_1.routesAuth)(app);
    (0, routes_1.routesImages)(app);
};
exports.setupRoutes = setupRoutes;
const setupApp = (app) => {
    app.use((0, cors_1.default)(corsOptions));
    app.use(express_1.default.json({ limit: "50mb" }));
    app.use((0, cookie_parser_1.default)());
    app.listen(8080, () => console.log(`Example app listening on port ${8080}`));
};
exports.setupApp = setupApp;
//# sourceMappingURL=setup.js.map