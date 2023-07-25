import { databaseService } from "../../services";
import { Controller } from "../../utils/types";

const { prisma, handleDisconnectDB } = databaseService;
const { user, collection } = prisma;

const createCollection: Controller = async (req, res) => {
  const { name, description }: { name: string; description?: string } = req.body;
  const { refreshToken }: { refreshToken: string } = req.cookies;

  try {
    if (!refreshToken) {
      res.status(401).send({ error: "Refresh token missing" });
      return;
    }

    const checkUserInDB = await user.findFirst({
      where: { refreshToken: refreshToken },
    });

    if (!checkUserInDB) {
      res.status(401).send({ error: "User not found" });
      return;
    }

    await collection.create({
      data: {
        name: name,
        description: description,
        User: { connect: { id: checkUserInDB?.id } },
      },
    });

    res.send({ message: "Collection created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error, creating collection failed" });
  } finally {
    await handleDisconnectDB();
  }
};

export { createCollection };
