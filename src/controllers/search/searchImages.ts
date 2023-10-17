import { Controller } from "../../utils";
import { databaseService } from "../../services";

const { prisma, handleDisconnectDB } = databaseService;

export const searchImages: Controller = async (req, res) => {
  const { query } = req.query;
  const url = `http://res.cloudinary.com/dkdkbllwf/image/upload/v1690037996`;

  try {
    const loadUploadedImages = await prisma.uploadedImages.findMany();
    const extractIds = loadUploadedImages.map(({ public_id }) => public_id);

    const lowerCase = (string: string) => string.toLowerCase();
    const queryWords = lowerCase(query as string).split(" ");

    const filteredSuggestions = extractIds.filter((suggestion) => {
      return queryWords.every((word) => lowerCase(suggestion).includes(word));
    });

    const searchedImages = filteredSuggestions.map((suggestion) => {
      const filename = suggestion.split("/")[1];
      return { public_id: suggestion, url: `${url}/${suggestion}`, filename };
    });

    res.send({ images: searchedImages });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Could not receive searched images" });
  } finally {
    await handleDisconnectDB();
  }
};
