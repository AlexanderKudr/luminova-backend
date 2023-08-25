import { ResourceApiResponse } from "cloudinary";

type ImagesFromDB = {
  favoriteImages: { public_id: string }[];
  collection: {
    collectionImages: { public_id: string }[];
  }[];
};

export const handleImages =  <T>(
  imagesFromCdn: ResourceApiResponse,
  imagesFromDB: T | undefined
) => {

  return imagesFromCdn?.resources.map((image) => {
    console.log(imagesFromDB)
    const { collection, favoriteImages } = imagesFromDB as ImagesFromDB;
    const isFavorite = favoriteImages?.some(({ public_id }) => public_id === image.public_id);

    const collectionImages = collection?.map((collection) => collection.collectionImages);

    const inCollection = collectionImages?.find((colImages) =>
      colImages.some(({ public_id }) => public_id === image.public_id)
    );

    return {
      ...image,
      favorite: isFavorite,
      inCollection: inCollection === undefined ? false : true,
    };
  });
};
