import express from "express";
import cors from "cors";
import { router as imageRouter } from "./routes/api/images.js";
import { config } from "./config/index.js";

const app = express();
const { port, corsOptions } = config;


app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use("/api/images", imageRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
