import { Controller, FetchImagesFromCDN } from "../../types";
import { v2 as cloudinary } from "cloudinary";
import { databaseUtils } from "../../utils";
import { pagePreview } from "../../lib";

const { prisma, handleDisconnectDB } = databaseUtils;

const imagesForUser: Controller = async (req, res) => {
  const { accessToken, category, next_cursor } = req.body as {
    accessToken: string;
    category: string | undefined;
    next_cursor: string;
  };

  try {
    const getImagesFromCDN: FetchImagesFromCDN = await cloudinary.search
      .expression(`folder:${category}`)
      .max_results(50)
      .next_cursor(next_cursor)
      .execute();
      
    const getFavoriteImagesFromDB = await prisma.user.findFirst({
      where: { accessToken },
      select: { favoriteImages: true },
    });

    const images = getImagesFromCDN?.resources.map((image) => {
      const isFavorite = getFavoriteImagesFromDB?.favoriteImages.some(
        ({ public_id }) => public_id === image.public_id
      );

      return isFavorite
        ? { ...image, favorite: true }
        : { ...image, favorite: false };
    });
    res.send({ images: images, pagePreview: pagePreview(category) });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Category images for user could not be fetched" });
  } finally {
    handleDisconnectDB();
  }
};
export { imagesForUser };
