import { v2 as cloudinary } from "cloudinary";
import { config } from "../../config/index.js";
import express from "express";

cloudinary.config(config.cloudinary);
const router = express.Router();
router.get("/api/images", (req, res) => {
  cloudinary.search
    .expression("folder:gallery")
    .sort_by("public_id", "desc")
    .max_results(30)//temporary fix
    .execute()
    .then((result) => res.json(result));
});
export { router };