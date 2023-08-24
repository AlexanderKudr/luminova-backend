import { constants } from "../../utils";
import { Controller, FetchImagesFromCDN } from "../../utils";
import { v2 as cloudinary } from "cloudinary";

const { pagePreview } = constants;

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

    res.send({ images: images.resources, pagePreview: pagePreview(category) });
  } catch (error) {
    res.status(500).send({ error: "Category images could not be fetched" });
  }
};

export { imagesForNonUser };
