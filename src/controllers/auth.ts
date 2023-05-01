import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../config/index.js";
import { Controller } from "../types/middlewares.js";
import { getUserBy, users } from "../../prisma/db.js";
import { time, hashPassword } from "../utils/index.js";
import { handleCheckUserInDB, handleCreateUser } from "../../prisma/script.js";

const { time5minutes, time30days } = time;
const { privateKey, publicKey } = config;

const register: Controller = async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };

  const user = await handleCheckUserInDB(email);
  if (user) {
    return res.status(400).send({ error: "User with this email already exists" });
  }
  // const ifUserExists = users.some((user) => user.email === email);
  // if (ifUserExists) {
  //   return res.status(400).send({ error: "User with this email already exists" });
  // }

  // const newUser = {
  //   email: email,
  //   password: await hashPassword(password),
  //   id: users.length + 1,
  //   accessToken: null,
  //   refreshToken: null,
  // };
  const accessToken = jwt.sign({ userEmail: email }, privateKey!, {
    algorithm: "RS256",
    expiresIn: time5minutes,
  });

  const refreshToken = jwt.sign({ userEmail: email }, privateKey!, {
    algorithm: "RS256",
    expiresIn: time30days,
  });
  const test = {
    email: email,
    password: await hashPassword(password),
    accessToken: accessToken,
    refreshToken: refreshToken,
    favoriteImages: [],
  };
  await handleCreateUser(test);
  // const accessToken = jwt.sign({ userEmail: newUser.email }, privateKey!, {
  //   algorithm: "RS256",
  //   expiresIn: time5minutes,
  // });
  // const refreshToken = jwt.sign({ userEmail: newUser.email }, privateKey!, {
  //   algorithm: "RS256",
  //   expiresIn: time30days,
  // });

  // users.push({
  //   email,
  //   password: await hashPassword(password),
  //   id: users.length + 1,
  //   accessToken: accessToken,
  //   refreshToken: refreshToken,
  // }) as unknown as typeof users;

  // console.log(users, "allusers");
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: time30days,
  });
  res.send({
    message: "User registered successfully",
    user: users.find((user) => user.email === email),
  });
};

const login: Controller = async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };

  const user = getUserBy(email);
  if (!user) {
    return res.status(401).send({ error: "Invalid email or password" });
  }
  console.log(password, user.password, "password");
  const passwordMatches = await bcrypt.compare(password, user.password);

  if (passwordMatches) {
    // Generate JWT token
    console.log(passwordMatches, "passwordMatches");
    const accessToken = jwt.sign({ userId: user!.id }, privateKey!, {
      algorithm: "RS256",
      expiresIn: time5minutes,
    });
    const refreshToken = jwt.sign({ userId: user!.id }, privateKey!, {
      algorithm: "RS256",
      expiresIn: time30days,
    });
    const findUser = users.find((user) => user.email === email)!;
    type Tokens = {
      accessToken: string;
      refreshToken: string;
    };
    const updateTokens = ({ accessToken, refreshToken }: Tokens) => {
      const user = users.find((user) => user.email === email)!;
      if (!user) {
        throw new Error("User not found");
      }
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
    };
    updateTokens({ accessToken, refreshToken });
    console.log(users, "users");
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: time30days,
    });
    res.send({
      message: `User ${findUser.email} logged in successfully`,
      user: users.find((user) => user.email === email),
      accessToken,
    });
  } else {
    res.status(401).send({ error: "Invalid email or password" });
  }
};

const protectedAccess: Controller = (req, res) => {
  try {
    res.send({ message: "protected access" });
  } catch (error) {
    res.status(500).send({ error: "Something went wrong" });
  }
};

const refreshTokens: Controller = (req, res) => {
  const { refreshToken } = req.cookies as { refreshToken: string };
  try {
    if (!refreshToken) {
      console.log(" no refreshToken");
      return res.status(401).send({ error: "Refresh token missing" });
    }

    const verify = jwt.verify(refreshToken, publicKey!);
    if (!verify) {
      console.log("Invalid token");
      return res.status(401).send({ error: "Invalid refresh token" });
    }
    const user = users.find((user) => {
      console.log(user.refreshToken, "here goes " + refreshToken);
      return user.refreshToken === refreshToken;
    });
    console.log(users, "user 139 line");
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }
    const accessToken = jwt.sign({ user: user.id }, privateKey!, {
      algorithm: "RS256",
      expiresIn: time5minutes,
    });

    const newRefreshToken = jwt.sign({ user: user.id }, privateKey!, {
      algorithm: "RS256",
      expiresIn: time30days,
    });
    user.refreshToken = newRefreshToken;
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: time30days,
    });
    res.send({
      message: "Token refreshed and user logged in successfully",
      user: users.find((user) => user.refreshToken === refreshToken),
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
};

const logout: Controller = (req, res) => {
  res.clearCookie("refreshToken");
  res.send({ message: "User logged out successfully" });
};

export { register, login, protectedAccess, refreshTokens, logout };
