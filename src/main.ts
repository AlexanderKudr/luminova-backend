import jwt from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { router as imageRouter } from "./routes/api/images.js";
import cookieParser from "cookie-parser";
import { config } from "./config/index.js";
import bcrypt from "bcrypt";
import { getUserBy, users } from "./routes/auth/db.js";
import { hashPassword } from "./routes/auth/utils.js";
import { verifyToken } from "./routes/auth/middleware.js";

const app = express();
const { port, corsOptions, privateKey, publicKey } = config;

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use("/api/images", imageRouter);

const time30days = 60 * 60 * 24 * 30;
const time5minutes = 60 * 5;

app.post("/register", async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };

  const ifUserExists = users.some((user) => user.email === email);
  console.log(ifUserExists, "ifUserExists");
  if (ifUserExists) {
    return res.status(401).send({ error: "User with this email already exists" });
  }

  const newUser = {
    email: email,
    password: await hashPassword(password),
    name: "test",
    id: users.length + 1,
    refreshToken: null,
  };

  const accessToken = jwt.sign({ userId: newUser.id }, privateKey!, {
    algorithm: "RS256",
    expiresIn: time5minutes,
  });
  const refreshToken = jwt.sign({ userId: newUser.id }, privateKey!, {
    algorithm: "RS256",
    expiresIn: time30days,
  });
  const addUser = users.push({
    email,
    password: await hashPassword(password),
    name: "test",
    id: users.length + 1,
    refreshToken: refreshToken,
  }) as unknown as typeof users;

  console.log(users, "allusers");
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: time30days,
  });
  res.send({
    message: "User registered successfully",
    user: users.find((user) => user.email === email),
    accessToken,
  });
});

app.post("/login", async (req, res) => {
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
    const updateTokens = (token: string) => {
      const user = users.find((user) => user.email === email)!;
      if (!user) {
        throw new Error("User not found");
      }
      user.refreshToken = token;
    };
    updateTokens(refreshToken);
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
});

app.get("/protected", verifyToken, (req, res) => {
  try {
    res.send({ message: "protected access" });
  } catch (error) {
    res.status(500).send({ error: "Something went wrong" });
  }
});

//client side
app.post("/refresh", verifyToken, async (req, res) => {
  const { refreshToken } = req.cookies;
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
});
app.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.send({ message: "User logged out successfully" });
});
app.listen(port, () => console.log(`Example app listening on port ${port}`));
