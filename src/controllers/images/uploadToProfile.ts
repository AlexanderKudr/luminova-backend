import { Controller } from "../../types";
import { UploadApiErrorResponse, v2 as cloudinary } from "cloudinary";
import multer from "multer";

type UploadFiles = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};

const upload = multer({
  storage: multer.diskStorage({
    destination: "public/temporal",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
}).array("file", 10);

const uploadToProfile: Controller = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        res.status(500).send({ error: "Error uploading image to Server" });
        return;
      } else {
        //write logic to receive user name on frontend and then continue here
        const { userName, category } = req.body;
        const files: UploadFiles[] = req.files as UploadFiles[];

        console.log(files[0].path, "req.files");

        const url = files[0].path;
        const fileName = files[0].filename;

        const uploadToCDN = await cloudinary.uploader.upload(url, {
          use_filename: true,
          public_id: fileName,
          folder: category,
        });
        
      }

    });

    // const uploadResult = await cloudinary.uploader.upload(url, {
    //   use_filename: true,
    //   public_id: title,
    //   folder: "gallery",
    // });
    // const contextResult = (await cloudinary.uploader.add_context(
    //   "favorite=false",
    //   [uploadResult.public_id]
    // )) as UploadApiErrorResponse;
    // res.json(contextResult);
    res.send({ message: "success" });
  } catch (error) {
    res.status(500).send("Error adding image to Cloudinary");
  }
};

export { uploadToProfile };
