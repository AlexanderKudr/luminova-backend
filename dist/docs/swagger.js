"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swagger = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const getOptions = (file) => {
    const docFile = js_yaml_1.default.load(fs_1.default.readFileSync(`src/docs/${file}.yaml`, "utf8"));
    return [swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docFile)];
};
const swagger = (app) => {
    app.use("/docs-core", ...getOptions("core"));
    // app.use("/docs-blog", ...options);
};
exports.swagger = swagger;
//# sourceMappingURL=swagger.js.map