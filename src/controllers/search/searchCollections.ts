import { Controller } from "../../utils";
import { databaseService } from "../../services";

const { prisma, handleDisconnectDB } = databaseService;

export const searchCollections: Controller = async (req, res) => {
  const { query } = req.query;

  try {
    const loadUploadedCollections = await prisma.collection.findMany();

    const lowerCase = (string: string) => string.toLowerCase();
    const queryWords = lowerCase(query as string).split(" ");

    const filteredCollections = loadUploadedCollections.filter((collection) => {
      return queryWords.every((word) => lowerCase(collection.name).includes(word));
    });

    const getCollectionsImages = await prisma.collectionImages.findMany({
      where: {
        collection_id: {
          in: filteredCollections.map((collection) => collection.id),
        },
      },
    });

    const attachImagesToCollections = filteredCollections.map((collection) => {
      const collectionImages = getCollectionsImages.filter((colImages) => {
        return colImages.collection_id === collection.id;
      });

      return { ...collection, collectionImages };
    });

    res.send({ collections: attachImagesToCollections });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Could not receive searched collections" });
  } finally {
    await handleDisconnectDB();
  }
};
