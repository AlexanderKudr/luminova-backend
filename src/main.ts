import express from "express";
import { setupApp, setupRoutes } from "./utils/index.js";

const app = express();

setupApp(app);
setupRoutes(app);
