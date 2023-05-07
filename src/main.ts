import express from "express";
import { setupApp, setupRoutes } from "./utils/index";

const app = express();

setupApp(app);
setupRoutes(app);
