import { databaseService } from "../../services";
import { Controller } from "../../utils";

type ProfileData = {
  firstName: string;
  lastName: string;
  personalSite: string;
  bio: string;
  instagram: string;
  twitter: string;
  email: string;
};

const { prisma, handleDisconnectDB } = databaseService;

const updateProfileData: Controller = async (req, res) => {
  const { refreshToken }: { refreshToken: string } = req.cookies;
  const payload: ProfileData = req.body;
  const { firstName, lastName, personalSite, bio, instagram, twitter, email } = payload;

  try {
    if (!refreshToken) {
      res.status(401).send({ error: "Refresh token is missing" });
      return;
    }

    const payload = { firstName, lastName, personalSite, bio, instagram, twitter };

    await prisma.user.update({
      where: { email },
      data: {
        personalInfo: {
          upsert: {
            // upserts(updates) the record if it exists, otherwise creates it
            create: payload,
            update: payload,
          },
        },
      },
    });

    res.send({ message: "Profile data updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Could not update profile data" });
  } finally {
    await handleDisconnectDB();
  }
};

export { updateProfileData };
