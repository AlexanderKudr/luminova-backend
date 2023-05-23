import { v2 as cloudinary } from "cloudinary";
import { Controller } from "../../types/middlewares";
import { handleDisconnectDB, prisma } from "../../utils";
import { FetchImagesFromCDN } from "../../types/cloudinary";

const getImagesForUser: Controller = async (req, res) => {
  const { accessToken } = req.body as { accessToken: string };
  try {
    const getImagesFromCDN: FetchImagesFromCDN = await cloudinary.search
      .expression("folder:gallery")
      .sort_by("public_id", "desc")
      .max_results(30) //temporary fix //TODO: remove the max_results
      .with_field("context")
      .execute();

    const getFavoriteImagesFromDB = await prisma.user.findFirst({
      where: { accessToken },
      select: { favoriteImages: true },
    });
    const images = getImagesFromCDN.resources.map((image) => {
      const isFavorite = getFavoriteImagesFromDB?.favoriteImages.some(
        ({ public_id }) => public_id === image.public_id
      );

      return isFavorite ? { ...image, favorite: true } : { ...image, favorite: false };
    });

    res.send({ resources: images });
  } catch (error) {
    console.log(error);

    res.status(500).send({ error: "Images could not be fetched" });
  } finally {
    handleDisconnectDB();
  }
};

export { getImagesForUser };
