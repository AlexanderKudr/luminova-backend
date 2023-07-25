import { Controller } from "../../utils/types";
import { databaseService } from "../../services";

const { handleDisconnectDB, prisma } = databaseService;

const openCollection: Controller = async (req, res) => {
  const { refreshToken }: { refreshToken: string } = req.cookies;
  const { collectionId }: { collectionId: number } = req.body;
  try {
    const checkUserInDB = await prisma.user.findFirst({
      where: { refreshToken: refreshToken },
      include: { collection: true },
    });

    if (!checkUserInDB) {
      res.status(401).send({ error: "User not found" });
      return;
    }

    const findCollection = checkUserInDB.collection.find(({ id }) => id === collectionId);

    if (!findCollection) {
      res.status(401).send({ error: "Collection not found" });
      return;
    }

    res.send({ message: "Collection opened successfully", collection: findCollection });
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Could not open collection" });
  } finally {
    await handleDisconnectDB();
  }
};

export { openCollection };
