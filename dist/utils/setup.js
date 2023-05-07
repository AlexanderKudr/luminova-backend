import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { config } from "../config/index.js";
import { routesAuth, routesImages } from "../routes/index.js";
const { corsOptions, port } = config;
const setupRoutes = (app) => {
    routesAuth(app);
    routesImages(app);
};
const setupApp = (app) => {
    app.use(cors(corsOptions));
    app.use(express.json({ limit: "50mb" }));
    app.use(cookieParser());
    app.listen(port, () => console.log(`Example app listening on port ${port}`));
};
export { setupRoutes, setupApp };
//# sourceMappingURL=setup.js.map