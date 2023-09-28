import { Controller } from "../../utils";

export const searchSuggestions: Controller = async (req, res) => {
  const { query } = req.query;
  const suggestions = [
    "car",
    "broken car",
    "car parts",
    "car repair",
    "car mechanic",
    "car insurance",
  ];

  try {
    const lowerCase = (string: string) => string.toLowerCase();
    const queryWords = lowerCase(query as string).split(" ");

    const filteredSuggestions = suggestions.filter((suggestion) => {
      return queryWords.every((word) => lowerCase(suggestion).includes(word));
    });

    console.log(filteredSuggestions, "filtered");

    res.send({ suggestions: filteredSuggestions });
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Could not get suggestions" });
  }
};
