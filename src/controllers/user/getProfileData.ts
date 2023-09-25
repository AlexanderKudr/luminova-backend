import { databaseService } from "../../services";
import { Controller } from "../../utils";

const { prisma, handleDisconnectDB } = databaseService;
const { user } = prisma;

const getProfileData: Controller = async (req, res) => {
  const { refreshToken }: { refreshToken: string } = req.cookies;

  if (!refreshToken) {
    res.status(401).send({ error: "Refresh token is missing" });
    return;
  }
  
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

export { getProfileData };