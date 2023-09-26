import { ResourceApiResponse, v2 as cloudinary } from "cloudinary";
import { Controller, constants, functions } from "../../utils";
import { databaseService } from "../../services";

type Payload = {
  accessToken: string;
  category: string | undefined;
  next_cursor: string;
};

const { prisma, handleDisconnectDB } = databaseService;
const { pagePreview } = constants;
const { handleImages } = functions;

const imagesForUser: Controller = async (req, res) => {
  const { accessToken, category, next_cursor } = req.body as Payload;
  try {
    const getImagesFromCDN: ResourceApiResponse = await cloudinary.search
      .expression(`folder:${category}`)
      .max_results(50)
      .next_cursor(next_cursor)
      .execute();

    const getDataFromDB = await prisma.user.findUnique({
      where: { accessToken },
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
    
    const returnImages = handleImages(getImagesFromCDN, getDataFromDB);

    res.send({ images: returnImages, pagePreview: pagePreview(category) });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Category images for user could not be fetched" });
  } finally {
    await handleDisconnectDB();
  }
};
export { imagesForUser };
