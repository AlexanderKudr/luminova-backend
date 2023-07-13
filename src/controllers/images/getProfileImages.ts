import { databaseService } from "../../services";
import { Controller } from "../../utils/types";
import { v2 as cloudinary } from "cloudinary";

const { prisma, handleDisconnectDB } = databaseService;

const getProfileImages: Controller = async (req, res) => {
  const { name }: { name: string } = req.body;

  try {
    if (!name) {
      res.status(400).send({ message: "name is missing" });
      return;
    }

    const checkUser = await prisma.user.findUnique({
      where: { name },
      include: { uploadedImages: true },
    });

    if (!checkUser) {
      res.status(400).send({ message: "User not found" });
      return;
    }

    const publicIds = checkUser.uploadedImages.map((image) => image.public_id);
    const imagesFromCDN = await cloudinary.api.resources_by_ids(publicIds);

    const images = imagesFromCDN?.resources.map((image) => {
      const isFavorite = checkUser?.uploadedImages.some(
        ({ public_id }) => public_id === image.public_id
      );
      return isFavorite ? { ...image, favorite: true } : { ...image, favorite: false };
    });

    res.send({ images: images, message: "Profile images retrieved" });
  } catch {
    res.status(500).send({ message: "Could not retrieve profile images" });
  } finally {
    handleDisconnectDB();
  }
};

export { getProfileImages };
