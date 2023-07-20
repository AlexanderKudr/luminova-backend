import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import { auth, images } from "./routes";
import { swagger } from "./docs";

const app = express();

const setupApp = (app: Express) => {
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
  // app.use((req, res, next) => {
  //   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  //   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  //   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  //   res.setHeader("Access-Control-Allow-Credentials", "true");
  //   next();
  // });
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
};

setupApp(app);
setupRoutes(app);
