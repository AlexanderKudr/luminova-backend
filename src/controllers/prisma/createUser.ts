import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { User } from "../../types/user";
import { prisma, handleDisconnectDB, handleErrorDB } from "../../utils";

const createUser = async (user: User) => {
  const { email, password, accessToken, refreshToken } = user;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      console.error(`User with email ${email} already exists`);
      return null;
    }

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: password,
        accessToken: accessToken,
        refreshToken: refreshToken,
        favoriteImages: { create: [] },
      },
    });
    return newUser;
  } catch (error) {
    const errorCheck = error instanceof PrismaClientKnownRequestError;

    if (errorCheck && error.code === "P2002") {
      console.error("User with email already exists");
    } else {
      console.error("Error creating user:", error);
    }
    return null;
  }
};

const handleCreateUser = async (user: User) => {
  try {
    await createUser(user);
    await handleDisconnectDB();
  } catch (error) {
    await handleErrorDB(error);
  }
};
export { handleCreateUser };
