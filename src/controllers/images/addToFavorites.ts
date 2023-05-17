import { Controller } from "../../types/middlewares";
import {
  findFavoriteImage,
  deleteFavoriteImage,
  addFavoriteImage,
} from "../prisma/updateFavoriteImages";

const addImageToFavorites: Controller = async (req, res) => {
  try {
    const { imageUrl, userEmail } = req.body as { imageUrl: string; userEmail: string };

    if (!imageUrl || !userEmail) {
      res.status(400).send({ message: "Email or imageUrl is missing" });
      return;
    }

    const existingFavoriteImage = await findFavoriteImage(imageUrl, userEmail);

    if (existingFavoriteImage) {
      await deleteFavoriteImage(existingFavoriteImage.id);
      res.json({ message: "Favorite image removed successfully" });
      return;
    }
    
    await addFavoriteImage(imageUrl, userEmail);
    res.json({ message: "Favorite image added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
export { addImageToFavorites };
