import { Controller } from "../../utils/types";
import { databaseService } from "../../services";

const { prisma, handleDisconnectDB } = databaseService;
const { user } = prisma;

const getProfileCollections: Controller = async (req, res) => {
  const { refreshToken }: { refreshToken: string } = req.cookies;

  try {
    if (!refreshToken) {
      res.status(401).send({ error: "Refresh token missing" });
      return;
    }
    const checkUserInDB = await user.findFirst({
      where: { refreshToken: refreshToken },
      include: {
        collection: {
          include: {
            collectionImages: true,
          },
        },
      },
    });

    if (!checkUserInDB) {
      res.status(401).send({ error: "User not found" });
      return;
    }

    console.log(checkUserInDB.collection, "checkUserInDB");
    res.send({
      collection: checkUserInDB.collection,
      message: "Collections fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error getting collections" });
  } finally {
    await handleDisconnectDB();
  }
};

export { getProfileCollections };
