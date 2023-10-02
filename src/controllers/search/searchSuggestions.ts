import { Controller } from "../../utils";
import { databaseService } from "../../services";

const { prisma, handleDisconnectDB } = databaseService;

export const searchSuggestions: Controller = async (req, res) => {
  const { query } = req.query;

  try {
    const loadUploadedImages = await prisma.uploadedImages.findMany();
    const extractIds = loadUploadedImages.map(({ public_id }) => public_id);

    const lowerCase = (string: string) => string.toLowerCase();
    const queryWords = lowerCase(query as string).split(" ");

    const filteredSuggestions = extractIds.filter((suggestion) => {
      return queryWords.every((word) => lowerCase(suggestion).includes(word));
    });

    const removeCategory = filteredSuggestions.map((suggestion) => {
      const split = suggestion.split("/");
      const result = split[split.length - 1];
      return result;
    });

    const uniqueSuggestions = [...new Set(removeCategory)];

    res.send({ suggestions: uniqueSuggestions });
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Could not get suggestions" });
  } finally {
    await handleDisconnectDB();
  }
};
