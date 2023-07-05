import { databaseService } from "../../services";
import { Controller } from "../../types";
import { ResourceApiResponse, v2 as cloudinary } from "cloudinary";

const { prisma } = databaseService;

const getFavoriteImages: Controller = async (req, res) => {
  const { user } = prisma;
  const { name }: { name: string } = req.body;

  try {
    if (!name) {
      res.status(400).send({ message: "name is missing" });
      return;
    }

    const checkUser = await user.findUnique({
      where: { name },
      include: { favoriteImages: true },
    });

    if (!checkUser) {
      res.status(400).send({ message: "User not found" });
      return;
    }

    const getFavoriteImagesFromDB = await user.findMany({
      where: { name: name },
      select: { favoriteImages: true },
    });

    const publicIds = getFavoriteImagesFromDB[0].favoriteImages.map((image) => image.public_id);
    const imagesFromCDN = await cloudinary.api.resources_by_ids(publicIds);

    const images = imagesFromCDN?.resources.map((image) => {
      const isFavorite = checkUser?.favoriteImages.some(
        ({ public_id }) => public_id === image.public_id
      );
      return isFavorite ? { ...image, favorite: true } : { ...image, favorite: false };
    });
    console.log(images);

    res.send({
      favoriteImages: images,
      message: "Favorite images retrieved successfully",
    });
  } catch {
    res.status(500).send({ message: "Could not retrieve favorite images" });
  }
};

export { getFavoriteImages };
