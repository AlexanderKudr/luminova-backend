import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";

import { databaseService } from "../../services";
import { functions, Controller } from "../../utils";

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
const { deleteTemporalImages } = functions;

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
        const filesPaths = files.map((file) => file.path);

        const uploadImagesToCDN = async (paths: string[], category: string) => {
          const systemPath = path.sep;

          const uploadPromises = paths.map(async (path) => {
            const split = path.split(systemPath);
            const filename = split[split.length - 1];

            const result = await cloudinary.uploader.upload(path, {
              use_filename: true,
              folder: category,
              public_id: filename,
            });

            return result;
          });

          const uploadResults = await Promise.all(uploadPromises);
          return uploadResults;
        };

        const uploadResults = await uploadImagesToCDN(filesPaths, category);

        const getIdsFromCDN = uploadResults?.map(({ public_id }) => {
          return { public_id: public_id };
        });

        const addPhotosToUserInDB = async (array: { public_id: string }[], userName: string) => {
          try {
            await prisma.user.update({
              where: { name: userName },
              data: {
                uploadedImages: {
                  createMany: {
                    data: array,
                  },
                },
              },
            });
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
  } finally {
    await handleDisconnectDB();
  }
};

export { uploadToProfile };
