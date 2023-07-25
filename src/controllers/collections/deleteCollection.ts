import { databaseService } from "../../services";
import { Controller } from "../../utils/types";

const { prisma, handleDisconnectDB } = databaseService;

const deleteCollection: Controller = async (req, res) => {
  const { refreshToken }: { refreshToken: string } = req.cookies;
  const { collectionId }: { collectionId: number } = req.body;

  try {
    if (!refreshToken) {
      res.status(401).send({ error: "Refresh token is missing" });
      return;
    }

    await prisma.collection.delete({
      where: { id: collectionId },
    });

    res.send({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: "Could not delete collection" });
  } finally {
    await handleDisconnectDB();
  }
};
export { deleteCollection };
