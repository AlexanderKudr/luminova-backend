import { v2 as cloudinary } from "cloudinary";
import { Controller } from "../../../types";

const getCategoriesFromCDN: Controller = async (req, res) => {
  try {
    const uploadResult = await cloudinary.api.root_folders();
    res.json(uploadResult);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding image to Cloudinary");
  }
};

export { getCategoriesFromCDN };
