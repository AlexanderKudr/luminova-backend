"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const docs_1 = require("./docs");
const config_1 = require("./config");
const app = (0, express_1.default)();
const { corsOptions } = config_1.config;
const setupApp = (app) => {
    app.use((0, cors_1.default)(corsOptions));
    app.use(express_1.default.json({ limit: "50mb" }));
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.static("public"));
    (0, docs_1.swagger)(app);
    app.listen(8080, () => console.log(`Example app listening on port ${8080}`));
};
const setupRoutes = (app) => {
    (0, routes_1.auth)(app);
    (0, routes_1.images)(app);
};
setupApp(app);
setupRoutes(app);
//# sourceMappingURL=main.js.map