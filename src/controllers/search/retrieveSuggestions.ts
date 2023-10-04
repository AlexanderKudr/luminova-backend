import { Controller } from "../../utils";
import { databaseService } from "../../services";

const { prisma, handleDisconnectDB } = databaseService;

export const retrieveSuggestions: Controller = async (req, res) => {
  const { query } = req.query;

  try {
    const loadUploadedImages = await prisma.uploadedImages.findMany();
    const extractIds = loadUploadedImages.map(({ public_id }) => public_id);

    const lowerCase = (string: string) => string.toLowerCase();
    const queryWords = lowerCase(query as string).split(" ");

    const filteredSuggestions = extractIds.filter((suggestion) => {
      return queryWords.every((word) => lowerCase(suggestion).includes(word));
    });

    res.send({ suggestions: filteredSuggestions });
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Could not get suggestions" });
  } finally {
    await handleDisconnectDB();
  }
};
