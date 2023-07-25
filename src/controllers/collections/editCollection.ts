import { Controller } from "../../utils/types";
import { databaseService } from "../../services";

const { prisma, handleDisconnectDB } = databaseService;
type Payload = { collectionId: number; name: string; description: string };

const editCollection: Controller = async (req, res) => {
  const { refreshToken }: { refreshToken: string } = req.cookies;
  const { collectionId, name, description }: Payload = req.body;

  try {
    if (!refreshToken) {
      res.status(401).send({ error: "Refresh token is missing" });
      return;
    }

    const editInDB = await prisma.collection.update({
      where: { id: collectionId },
      data: { name: name, description: description },
    });
    
    res.send({ message: "Collection edited successfully", editInDB });
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: "Could not edit collection" });
  } finally {
    await handleDisconnectDB();
  }
};
export { editCollection };
