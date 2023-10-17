import { Controller } from "../../utils";
import { databaseService } from "../../services";

const { prisma, handleDisconnectDB } = databaseService;

export const searchUsers: Controller = async (req, res) => {
  const { query } = req.query;

  try {
    const loadAllUsers = await prisma.user.findMany();

    const lowerCase = (string: string) => string.toLowerCase();
    const queryWords = lowerCase(query as string).split(" ");

    const filteredUsers = loadAllUsers.filter((user) => {
      return queryWords.every((word) => lowerCase(user.name).includes(word));
    });

    const users = filteredUsers.map(({ id, name, email }) => {
      return { id, name, email };
    });

    res.send({ users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Could not receive searched users" });
  } finally {
    await handleDisconnectDB();
  }
};
