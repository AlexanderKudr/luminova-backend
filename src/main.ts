import express from "express";
import { setupApp, setupRoutes } from "./utils";

const app = express();

setupApp(app);
setupRoutes(app);


