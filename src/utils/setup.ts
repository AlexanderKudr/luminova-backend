import cors from "cors";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import { config } from "@/config";
import { routesAuth, routesImages } from "@/routes";

const { corsOptions, port } = config;

const setupRoutes = (app: Express) => {
  routesAuth(app);
  routesImages(app);
};

const setupApp = (app: Express) => {
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "50mb" }));
  app.use(cookieParser());
  app.listen(8080, () => console.log(`Example app listening on port ${8080}`));
};
export { setupRoutes, setupApp };
