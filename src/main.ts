import express from "express";
import { utils } from "./utils/index.js";

const { setupApp, setupRoutes } = utils;
const app = express();

setupApp(app);
setupRoutes(app);
