import express from "express";
import cors from "cors";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const { PORT } = process.env;
const corsOptions = { origin: "http://localhost:5173", credentials: true };

app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/images", (req, res) => {
  const directoryPath = "./public";
  fs.readdir(directoryPath, (error, files) => {
    error && console.log("Unable to scan directory: " + error);
    const images = files.filter((file) => file.endsWith(".jpg"));
    res.json(images);
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
