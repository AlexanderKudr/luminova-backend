import { Controller } from "../../utils/types";
import { ResourceApiResponse, v2 as cloudinary } from "cloudinary";
import { pagePreview } from "../../utils/lib";
import { databaseService } from "../../services";

type Payload = {
  accessToken: string;
  category: string | undefined;
  next_cursor: string;
};
const { prisma, handleDisconnectDB } = databaseService;

const imagesForUser: Controller = async (req, res) => {
  const { accessToken, category, next_cursor } = req.body as Payload;
  try {
    const getImagesFromCDN: ResourceApiResponse = await cloudinary.search
      .expression(`folder:${category}`)
      .max_results(50)
      .next_cursor(next_cursor)
      .execute();

    const getFavoriteImagesFromDB = await prisma.user.findUnique({
      where: { accessToken },
      include: { favoriteImages: true, collection: true },
      //TODO add check if image exist in any collection
    });

    const images = getImagesFromCDN?.resources.map((image) => {
      const isFavorite = getFavoriteImagesFromDB?.favoriteImages.some(
        ({ public_id }) => public_id === image.public_id
      );
      return isFavorite ? { ...image, favorite: true } : { ...image, favorite: false };
    });

    res.send({ images: images, pagePreview: pagePreview(category) });
  } catch (error) {
    res.status(500).send({ error: "Category images for user could not be fetched" });
  } finally {
    await handleDisconnectDB();
  }
};
export { imagesForUser };
