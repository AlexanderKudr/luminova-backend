import { v2 as cloudinary } from "cloudinary";
import { Controller, FetchImagesFromCDN } from "../../utils";
import { databaseService } from "../../services";

//This is a function that loads images into the database depending on the category
//and the next_cursor
//Use this method if you want to load more images in bulk as an admin

const { prisma, handleDisconnectDB } = databaseService;

export const loadImagesIntoDB: Controller = async (req, res) => {
  const { category, next_cursor } = req.body as { category: string; next_cursor: string };

  try {
    const imagesFromCDN: FetchImagesFromCDN = await cloudinary.search
      .expression(`folder:${category}`)
      .max_results(3000)
      .next_cursor(next_cursor)
      .execute();

    const getCdnPublicIds = imagesFromCDN.resources.map((image) => image.public_id);

    const getAllImagesFromDB = (await prisma.uploadedImages.findMany()).map(
      (image) => image.public_id
    );

    const getUniqueImages = getCdnPublicIds.filter((image) => !getAllImagesFromDB.includes(image));

    await prisma.uploadedImages.createMany({
      data: getUniqueImages.map((imageId) => ({
        public_id: imageId,
      })),
    });

    res.send({ images: getCdnPublicIds, message: "success" });
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Could not load images into database" });
  } finally {
    await handleDisconnectDB();
  }
};
