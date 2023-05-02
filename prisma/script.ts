import { User } from "../src/types/user.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { handleDisconnectDB, handleErrorDB, prisma } from "../src/utils/handleDB.js";

const createUser = async (user: User) => {
  const { email, password, accessToken, refreshToken } = user;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      console.error("User with email already exists");
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

    console.log("New user created:", newUser);
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

const checkUserInDb = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    await handleDisconnectDB();
    return user;
  } catch (error) {
    await handleErrorDB(error);
    return null;
  }
};

export { handleCreateUser, checkUserInDb };
