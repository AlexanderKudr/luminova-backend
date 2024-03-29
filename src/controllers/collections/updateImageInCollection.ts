import { databaseService } from "../../services";
import { Controller } from "../../utils";

const { prisma, handleDisconnectDB } = databaseService;

const updateImageInCollection: Controller = async (req, res) => {
  const { refreshToken }: { refreshToken: string } = req.cookies;
  const { collectionId, public_id }: { collectionId: number; public_id: string } = req.body;
  // console.log(req.body, 'payload on back')

  try {
    if (!refreshToken) {
      res.status(401).send({ error: "Refresh token is missing" });
      return;
    }

    const checkUserInDB = await prisma.user.findFirst({
      where: { refreshToken: refreshToken },
    });

    if (!checkUserInDB) {
      res.status(401).send({ error: "User not found" });
      return;
    }
    const findCollection = await prisma.collection.findFirst({
      where: { id: collectionId },
      include: { collectionImages: true },
    });

    const findImageInCollection = findCollection?.collectionImages.find(
      (image) => image.public_id === public_id
    );

    if (findImageInCollection) {
      await prisma.collectionImages.delete({
        where: { id: findImageInCollection.id },
      });

      res.send({ message: "Image from collection removed successfully" });
      return;
    }

    await prisma.collectionImages.create({
      data: {
        public_id: public_id,
        collection: { connect: { id: collectionId } },
      },
    });
    res.status(200).send({ message: "Image added to collection successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error updating image in collections" });
  } finally {
    await handleDisconnectDB();
  }
};

export { updateImageInCollection };
