import { pageDescription } from "../../lib";
import { Controller, FetchImagesFromCDN } from "../../types";
import { v2 as cloudinary } from "cloudinary";

const imagesForNonUser: Controller = async (req, res) => {
  const { category, next_cursor } = req.body as {
    accessToken: string;
    category: string | undefined;
    next_cursor: string;
  };

  try {
    const images: FetchImagesFromCDN = await cloudinary.search
      .expression(`folder:${category}`)
      .max_results(50)
      .next_cursor(next_cursor)
      .execute();

    const pagePreview = {
      img: `http://localhost:8080/images/${category}.jpg`,
      description: pageDescription[category as keyof typeof pageDescription],
    };

    res.send({ images: images, pagePreview: pagePreview });
  } catch (error) {
    res.status(500).send({ error: "Category images could not be fetched" });
  }
};
export { imagesForNonUser };
