import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import { auth, images } from "./routes";
import { config } from "./config";

const app = express();
const { corsOptions, port } = config;

const setupApp = (app: Express) => {
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "50mb" }));
  app.use(cookieParser());
  app.listen(8080, () => console.log(`Example app listening on port ${8080}`));
};

const setupRoutes = (app: Express) => {
  auth(app);
  images(app);
};

setupApp(app);
setupRoutes(app);
