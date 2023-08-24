import { databaseService } from "../../services";
import { Controller, functions } from "../../utils";
import { v2 as cloudinary } from "cloudinary";

const { prisma, handleDisconnectDB } = databaseService;
const { handleImages } = functions;

const getFavoriteImages: Controller = async (req, res) => {
  const { user } = prisma;
  const { userName } = req.params;

  try {
    if (!userName) {
      res.status(400).send({ message: "name is missing" });
      return;
    }

    const getDataFromDB = await user.findUnique({
      where: { name: userName },
      include: {
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

    const publicIds = getDataFromDB.favoriteImages.map((image) => image.public_id);

    const imagesFromCDN = await cloudinary.api.resources_by_ids(publicIds);

    const returnImages = handleImages(imagesFromCDN, getDataFromDB);

    res.send({ images: returnImages, message: "Favorite images retrieved" });
  } catch {
    res.status(500).send({ message: "Could not retrieve favorite images" });
  } finally {
    await handleDisconnectDB();
  }
};

export { getFavoriteImages };
