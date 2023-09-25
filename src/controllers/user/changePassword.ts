import { Controller } from "../../utils";
import { databaseService, jwtService } from "../../services";

const { prisma, handleDisconnectDB } = databaseService;
const { bcrypt, hashPassword } = jwtService;

const changePassword: Controller = async (req, res) => {
  const { refreshToken } = req.cookies as { refreshToken: string };
  const { currentPassword, newPassword } = req.body as {
    currentPassword: string;
    newPassword: string;
  };

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

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { email: getUserFromDB?.email },
      data: { password: hashedPassword },
    });

    res.status(200).send({ message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Could not change password" });
  } finally {
    await handleDisconnectDB();
  }
};

export { changePassword };
