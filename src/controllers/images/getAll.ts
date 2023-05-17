import { v2 as cloudinary } from "cloudinary";
import { Controller } from "../../types/middlewares";

const getImages: Controller = (req, res) => {
  cloudinary.search
    .expression("folder:gallery")
    .sort_by("public_id", "desc")
    .max_results(30) //temporary fix //TODO: remove the max_results
    .execute()
    .then((result) => res.json(result));
};
export { getImages };
