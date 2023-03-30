import express from "express";
import cors from "cors";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const { PORT } = process.env;

app.use(express.static("public"));
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/api/images", (req, res) => {
  const directoryPath = "./public";
  fs.readdir(directoryPath, (error, files) => {
    error ? console.log("Unable to scan directory: " + error) : null;
    const images = files.filter((file) => file.endsWith(".jpg"));
    res.json(images);
    console.log(images);
  });
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
