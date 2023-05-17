import { Controller } from "../../types/middlewares";
import { v2 as cloudinary } from "cloudinary";

const addImageToCDN: Controller = (req, res) => {
  const { title, url } = req.body as { title: string; url: string };
  cloudinary.uploader
    .upload(url, { use_filename: true, public_id: title, folder: "gallery" })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};
export { addImageToCDN };
