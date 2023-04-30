import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { config } from "../config/index.js";
import { Express } from "express";
import { routesAuth, routesImages } from "../routes/index.js";

const { corsOptions, port } = config;

const setupRoutes = (app: Express) => {
  routesAuth(app);
  routesImages(app);
};

const setupApp = (app: Express) => {
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "50mb" }));
  app.use(cookieParser());
  app.listen(port, () => console.log(`Example app listening on port ${port}`));
};
export { setupRoutes, setupApp };