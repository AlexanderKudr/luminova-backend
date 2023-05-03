import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../config/index.js";
import { Controller } from "../types/middlewares.js";
import { generateTokens } from "../utils/jwt.js";
import { time, hashPassword } from "../utils/index.js";
import {
  checkUserInDB,
  handleCreateUser,
  updateUserTokensInDB,
  updateRefreshTokenInDB,
  clearUserTokensInDB,
} from "../../prisma/script.js";

const { time30days } = time;
const { privateKey, publicKey } = config;

const register: Controller = async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };

  const user = await checkUserInDB("email", email);
  if (user) {
    return res.status(400).send({ error: "User with this email already exists" });
  }

  const { accessToken, refreshToken } = generateTokens(email, privateKey!);

  const newUser = {
    email: email,
    password: await hashPassword(password),
    accessToken: accessToken,
    refreshToken: refreshToken,
    favoriteImages: [],
  };

  await handleCreateUser(newUser);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: time30days,
  });

  res.send({
    message: "User registered successfully",
    user: await checkUserInDB("email", email),
  });
};
const login: Controller = async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  const user = await checkUserInDB("email", email);

  if (!user) {
    return res.status(401).send({ error: "Invalid email or password" });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (passwordMatches) {
    const { accessToken, refreshToken } = generateTokens(email, privateKey!);
    updateUserTokensInDB({ email, accessToken, refreshToken });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: time30days,
    });

    res.send({
      message: `User ${user?.email} logged in successfully`,
      accessToken,
    });
  } else {
    res.status(401).send({ error: "Invalid email or password" });
  }
};

const protectedAccess: Controller = (req, res) => {
  try {
    res.send({ message: "Protected access successfully" });
  } catch (error) {
    res.status(500).send({ error: "Protected access error" });
  }
};

const refreshTokens: Controller = async (req, res) => {
  const { refreshToken } = req.cookies as { refreshToken: string };
  try {
    if (!refreshToken) {
      return res.status(401).send({ error: "Refresh token missing" });
    }

    const veryfyToken = jwt.verify(refreshToken, publicKey!);
    if (!veryfyToken) {
      return res.status(401).send({ error: "Invalid refresh token" });
    }

    const user = await checkUserInDB("refreshToken", refreshToken);
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      refreshToken,
      privateKey!
    );
    updateRefreshTokenInDB(newRefreshToken);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: time30days,
    });
    res.send({
      message: "Token refreshed and user logged in successfully",
      user: await checkUserInDB("email", refreshToken),
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
};

const logout: Controller = (req, res) => {
  const { refreshToken } = req.cookies as { refreshToken: string };
  clearUserTokensInDB(refreshToken);
  res.clearCookie("refreshToken");
  res.send({ message: "User logged out successfully" });
};

export { register, login, protectedAccess, refreshTokens, logout };
