import { databaseService } from "../../services";
import { Controller } from "../../utils";

const { prisma, handleDisconnectDB } = databaseService;
const { user } = prisma;

export const getUserData: Controller = async (req, res) => {
  const { refreshToken }: { refreshToken: string } = req.cookies;

  try {
    const getDataFromDb = await user.findFirst({
      where: { refreshToken },
      include: { personalInfo: true },
    });

    const { personalInfo, name, email } = getDataFromDb || {};

    res.send({ data: { personalInfo, name, email }, message: "User data fetched successfully" });
  } catch (error) {
    console.log(error);

    res.status(401).send({ error: "Could not get user data" });
  } finally {
    await handleDisconnectDB();
  }
};
