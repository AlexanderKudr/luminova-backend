import { prisma } from "../../utils";

const findFavoriteImage = async (imageUrl: string, userEmail: string) => {
  const { favoriteImages } = prisma;
  const existingFavoriteImage = await favoriteImages.findUnique({
    where: {
      user_email_image_url: {
        user_email: userEmail,
        image_url: imageUrl,
      },
    },
  });

  return existingFavoriteImage;
};

const deleteFavoriteImage = async (id: number) => {
  const { favoriteImages } = prisma;
  await favoriteImages.delete({
    where: { id },
  });
};

const addFavoriteImage = async (imageUrl: string, userEmail: string) => {
  await prisma.user.update({
    where: { email: userEmail },
    data: {
      favoriteImages: {
        create: { image_url: imageUrl },
      },
    },
  });
};

export { findFavoriteImage, deleteFavoriteImage, addFavoriteImage };
