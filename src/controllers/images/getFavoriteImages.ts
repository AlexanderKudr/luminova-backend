import { databaseService } from "../../services";
import { Controller } from "../../utils/types";
import { ResourceApiResponse, v2 as cloudinary } from "cloudinary";

const { prisma, handleDisconnectDB } = databaseService;

const getFavoriteImages: Controller = async (req, res) => {
  const { user } = prisma;
  const { userName } = req.params;

  try {
    if (!userName) {
      res.status(400).send({ message: "name is missing" });
      return;
    }

    const checkUser = await user.findUnique({
      where: { name: userName },
      include: { favoriteImages: true },
    });
    if (!checkUser) {
      res.status(400).send({ message: "User not found" });
      return;
    }

    const publicIds = checkUser.favoriteImages.map((image) => image.public_id);
    const imagesFromCDN = await cloudinary.api.resources_by_ids(publicIds);

    const images = imagesFromCDN?.resources.map((image) => {
      const isFavorite = checkUser?.favoriteImages.some(
        ({ public_id }) => public_id === image.public_id
      );
      return isFavorite ? { ...image, favorite: true } : { ...image, favorite: false };
    });
    
    
    
    res.send({ images: images, message: "Favorite images retrieved" });
  } catch {
    res.status(500).send({ message: "Could not retrieve favorite images" });
  } finally {
    await handleDisconnectDB();
  }
};

export { getFavoriteImages };
