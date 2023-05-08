import { v2 as cloudinary } from "cloudinary";
import { config } from "@/config";
import { Controller } from "@/types/middlewares";

cloudinary.config(config.cloudinary);
const getImages: Controller = (req, res) => {
  cloudinary.search
    .expression("folder:gallery")
    .sort_by("public_id", "desc")
    .max_results(30) //temporary fix //TODO: remove the max_results
    .execute()
    .then((result) => res.json(result));
};

const addImage: Controller = (req, res) => {
  const { title, url } = req.body as { title: string; url: string };
  cloudinary.uploader
    .upload(url, { use_filename: true, public_id: title, folder: "gallery" })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};
export { getImages, addImage };
