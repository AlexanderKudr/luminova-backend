import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { auth, images, collections, user, search } from "./routes";
import { swagger } from "./docs";

const app = express();

const setupApp = (app: Express) => {
  app.use(cors({ origin: "https://master--luminova.netlify.app", credentials: true }));
  app.use(express.json({ limit: "50mb" }));
  app.use(cookieParser());
  app.use(express.static("public"));

  swagger(app);
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}`)
  );
};

const setupRoutes = (app: Express) => {
  auth(app);
  images(app);
  collections(app);
  user(app);
  search(app);
};

setupApp(app);
setupRoutes(app);
