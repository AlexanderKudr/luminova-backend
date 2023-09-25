import { databaseService } from "../../services";
import { Controller, functions } from "../../utils";
import { v2 as cloudinary } from "cloudinary";

const { prisma, handleDisconnectDB } = databaseService;
const { handleImages } = functions;

const getProfileImages: Controller = async (req, res) => {
  const { userName } = req.params;
  try {
    if (!userName) {
      res.status(400).send({ message: "name is missing" });
      return;
    }

    const getDataFromDB = await prisma.user.findUnique({
      where: { name: userName },
      include: {
        uploadedImages: true,
        favoriteImages: true,
        collection: {
          include: {
            collectionImages: true,
          },
        },
      },
    });
    if (!getDataFromDB) {
      res.status(400).send({ message: "User not found" });
      return;
    }
    const publicIds = getDataFromDB.uploadedImages.map((image) => image.public_id);

    if (publicIds.length === 0) {
      res.status(400).send({ message: "No images found" });
      return;
    }
    const imagesFromCDN = await cloudinary.api.resources_by_ids(publicIds);

    const returnImages = handleImages(imagesFromCDN, getDataFromDB);

    res.send({ images: returnImages, message: "Profile images retrieved" });
  } catch {
    res.status(500).send({ message: "Could not retrieve profile images" });
  } finally {
    await handleDisconnectDB();
  }
};

export { getProfileImages };
