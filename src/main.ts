import express from "express";
import cors from "cors";
import { router as imageRouter } from "./routes/api/images.js";
import { routes as routesAuth } from "./routes/auth/routesAuth.js";
import { config } from "./config/index.js";
import {deserializeUser} from "./routes/auth/middleware.js";

const app = express();
const { port, corsOptions } = config;

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use("/api/images", imageRouter);
routesAuth(app);
app.use(deserializeUser);
app.listen(port, () => console.log(`Listening on port ${port}`));
