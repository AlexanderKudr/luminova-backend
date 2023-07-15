import { Controller } from "../../utils/types";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { databaseService } from "../../services/db";
import { deleteTemporalImages } from "../../utils/functions";

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
    destination: (req, file, cb) => cb(null, "./public/temporal"),
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
}).array("file", 10);

const { prisma, handleDisconnectDB, checkUserInDB } = databaseService;

const uploadToProfile: Controller = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err, "Error uploading image to Server");
        res.status(500).send({ error: "Error uploading image to Server" });
        return;
      } else {
        const { userName, category } = req.body as { userName: string; category: string };

        const user = await checkUserInDB("name", userName);

        if (!user) {
          res.status(401).send({ error: "User not found" });
          return;
        }

        const files = req.files as UploadFiles[];
        const filesPaths = files.map((file) => file.destination);

        const uploadImagesToCDN = async (paths: string[], category: string) => {
          try {
            const uploadPromises = paths.map(async (path) => {
              const filename = path.split("/").pop();

              const result = await cloudinary.uploader.upload(path, {
                use_filename: true,
                folder: category,
                public_id: filename,
              });
              console.log(result, "result");
              return result;
            });

            const uploadResults = await Promise.all(uploadPromises);
            console.log("images uploaded to cloudinary");
            return uploadResults;
          } catch (error) {
            console.error("Error uploading images to CDN:", error);
            console.log("Path:", paths);
            throw error; // Rethrow the error to propagate it to the caller
          }
        };

        const uploadResults = await uploadImagesToCDN(filesPaths, category);

        const getIdsFromCDN = uploadResults?.map(({ public_id }) => {
          return { public_id: public_id };
        });

        const addPhotosToUserInDB = async (array: { public_id: string }[], userName: string) => {
          try {
            const addImages = await prisma.user.update({
              where: { name: userName },
              data: {
                uploadedImages: {
                  createMany: {
                    data: array,
                  },
                },
              },
            });

            console.log(addImages, "added images to db");
          } catch (error) {
            console.error(error);
          } finally {
            handleDisconnectDB();
          }
        };

        await addPhotosToUserInDB(getIdsFromCDN!, userName);
        deleteTemporalImages("public/temporal");

        res.send({ message: "success" });
      }
    });
  } catch (error) {
    res.status(500).send("Error adding image to Cloudinary");
  }
};

export { uploadToProfile };
