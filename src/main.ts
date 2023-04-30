import express from "express";
import { setupApp, setupRoutes } from "./utils/setup.js";

const app = express();

setupApp(app);
setupRoutes(app);
