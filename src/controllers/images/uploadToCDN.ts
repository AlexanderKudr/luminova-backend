import { Controller } from "../../types";
import { UploadApiErrorResponse, v2 as cloudinary } from "cloudinary";

const uploadToCDN: Controller = async (req, res) => {
  const { title, url } = req.body as { title: string; url: string };

  try {
    const uploadResult = await cloudinary.uploader.upload(url, {
      use_filename: true,
      public_id: title,
      folder: "gallery",
    });

    const contextResult = (await cloudinary.uploader.add_context(
      "favorite=false",
      [uploadResult.public_id]
    )) as UploadApiErrorResponse;

    res.json(contextResult);
  } catch (error) {
    console.error(error);

    res.status(500).send("Error adding image to Cloudinary");
  }
};

export { uploadToCDN };
