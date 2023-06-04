import { v2 as cloudinary } from "cloudinary";
import { Controller } from "../../types/middlewares";

const getImagesForNonUser: Controller = async (req, res) => {
  try {
    await cloudinary.search
      .expression("folder:gallery")
      .sort_by("public_id", "desc")
      .max_results(30) //temporary fix //TODO: remove the max_results
      .with_field("context")
      .execute()
      .then((result) => res.json(result));
      
  } catch (error) {
    console.log(error);

    res.status(500).send({ error: "Images could not be fetched" });
  }
};

export { getImagesForNonUser };
