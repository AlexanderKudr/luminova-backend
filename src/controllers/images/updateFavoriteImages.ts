import { databaseService } from "../../services";
import { Controller } from "../../utils/types";

type Payload = { public_id: string; accessToken: string };

const { handleDisconnectDB, prisma } = databaseService;

const updateFavoriteImages: Controller = async (req, res) => {
  const { public_id, accessToken } = req.body as Payload;
  const { user, favoriteImages } = prisma;

  try {
    if (!public_id || !accessToken) {
      res.status(400).send({ message: "public_id or accessToken is missing" });
      return;
    }

    const existingUser = await user.findFirst({
      where: { accessToken: accessToken },
    });
    if (!existingUser) {
      res.status(400).send({ message: "User not found" });
      return;
    }

    const existingFavoriteImage = await favoriteImages.findFirst({
      where: { public_id: public_id, user_id: existingUser?.id },
    });

    if (existingFavoriteImage) {
      await favoriteImages.delete({
        where: { id: existingFavoriteImage.id },
      });

      res.send({ message: "Favorite image removed successfully" });
      return;
    }

    await favoriteImages.create({
      data: {
        public_id: public_id,
        User: { connect: { id: existingUser?.id } },
      },
    });

    res.send({ message: "Favorite image added successfully" });
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .send({ message: "Internal server error, adding/deleting image to favorites failed" });
  } finally {
    handleDisconnectDB();
  }
};
export { updateFavoriteImages };
