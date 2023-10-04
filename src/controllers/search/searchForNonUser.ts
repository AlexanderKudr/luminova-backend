import { Controller } from "../../utils";
import { databaseService } from "../../services";

const { prisma, handleDisconnectDB } = databaseService;

export const searchForNonUser: Controller = async (req, res) => {
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

    const attachUrl = filteredSuggestions.map((suggestion) => {
      const filename = suggestion.split("/")[1];
      return { public_id: suggestion, url: `${url}/${suggestion}`, filename };
    });

    res.send({ suggestions: attachUrl });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Could not hit interactive search" });
  } finally {
    await handleDisconnectDB();
  }
};
