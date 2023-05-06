import { UpdateUserTokens, User } from "../types/user.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { handleDisconnectDB, handleErrorDB, prisma } from "../utils/index.js";

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

const checkUserInDB = async (field: string, value: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { [field]: value },
    });
 
    await handleDisconnectDB();
    return user;
  } catch (error) {
    await handleErrorDB(error);
    return null;
  }
};

const updateUserTokensInDB = async ({ email, accessToken, refreshToken }: UpdateUserTokens) => {
  try {
    const user = await prisma.user.updateMany({
      where: { email: email },
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    await handleDisconnectDB();
  } catch (error) {
    await handleErrorDB(error);
  }
};

const updateRefreshTokenInDB = async (refreshToken: string) => {
  try {
    const user = await prisma.user.updateMany({
      where: { refreshToken },
      data: { refreshToken },
    });
    if (!user) {
      throw new Error("User not found");
    }
    await handleDisconnectDB();
    return user;
  } catch (error) {
    await handleErrorDB(error);
    return null;
  }
};

const clearUserTokensInDB = async (refreshToken: string) => {
  try {
    const user = await prisma.user.updateMany({
      where: { refreshToken },
      data: { accessToken: null, refreshToken: null },
    });
    if (!user) {
      throw new Error("User not found");
    }
    await handleDisconnectDB();
  } catch (error) {
    await handleErrorDB(error);
  }
};

export {
  handleCreateUser,
  checkUserInDB,
  updateUserTokensInDB,
  updateRefreshTokenInDB,
  clearUserTokensInDB,
};
