import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import { auth, images } from "./routes";
import { swagger } from "./docs";
import { config } from "./config";

const app = express();
const { corsOptions } = config;

const setupApp = (app: Express) => {
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "50mb" }));
  app.use(cookieParser());
  app.use(express.static("public"));

  swagger(app);
  app.listen(8080, () => console.log(`Example app listening on port ${8080}`));
};

const setupRoutes = (app: Express) => {
  auth(app);
  images(app);
};

setupApp(app);
setupRoutes(app);
