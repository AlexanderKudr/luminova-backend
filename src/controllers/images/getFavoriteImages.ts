import { Controller, FavoriteImages, User } from "../../types";
import { databaseUtils } from "../../utils";

const { prisma } = databaseUtils;

const getFavoriteImages: Controller = async (req, res) => {
  const { user } = prisma;
  const { name }: { name: string } = req.body;

  try {
    if (!name) {
      res.status(400).send({ message: "name is missing" });
      return;
    }

    const checkUser = await user.findUnique({
      where: { name: name },
    });

    if (!checkUser) {
      res.status(400).send({ message: "User not found" });
      return;
    }

    const images = await user.findMany({
      where: { name: name },
      select: { favoriteImages: true },
    });

    res.send({
      images: images[0].favoriteImages,
      message: "Favorite images retrieved successfully",
    });
    
  } catch {
    res.status(500).send({ message: "Could not retrieve favorite images" });
  }
};

export { getFavoriteImages };
