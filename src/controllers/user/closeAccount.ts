import { Controller } from "../../utils";
import { databaseService, jwtService } from "../../services";

const { prisma, handleDisconnectDB } = databaseService;
const { bcrypt } = jwtService;

export const closeAccount: Controller = async (req, res) => {
  const { refreshToken } = req.cookies as { refreshToken: string };
  const { currentPassword } = req.body as { currentPassword: string };

  try {
    if (!refreshToken) {
      res.status(401).send({ error: "Refresh token is missing" });
      return;
    }

    const getUserFromDB = await prisma.user.findFirst({
      where: { refreshToken },
    });

    const isPasswordValid = await bcrypt.compare(currentPassword, getUserFromDB?.password || "");

    if (!isPasswordValid) {
      res.status(401).send({ error: "Current password does not match" });
      return;
    }
    await prisma.personalInfo.deleteMany({
      where: { user_id: getUserFromDB?.id },
    })

    await prisma.user.delete({
      where: { email: getUserFromDB?.email },
    });

    res.status(200).send({ message: "Account closed successfully" });
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Could not close account" });
  } finally {
    await handleDisconnectDB();
  }
};
