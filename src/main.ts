import jwt from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { router as imageRouter } from "./routes/api/images.js";
import { routes as routesAuth } from "./routes/auth/routesAuth.js";
import cookieParser from "cookie-parser";
import { config } from "./config/index.js";
import bcrypt from "bcrypt";
import { getUserBy, users } from "./routes/auth/db.js";
import { privateKey } from "./routes/auth/keys/privateKey.js";
import { publicKey } from "./routes/auth/keys/publicKey.js";

const app = express();
const { port, corsOptions } = config;

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use("/api/images", imageRouter);

app.post("/register", async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user in database with hashed password
  // const user = await User.create({ email, password: hashedPassword });]
  const newUser = {
    email,
    password: hashedPassword,
    name: "test",
    id: users.length + 1,
  };
  // Generate JWT token
  const accessToken = jwt.sign({ userId: newUser.id }, privateKey, {
    algorithm: "RS256",
    expiresIn: 300000,
  });
  const refreshToken = jwt.sign({ userId: newUser.id }, privateKey, {
    algorithm: "RS256",
    expiresIn: 30000000,
  });
  const addUser = users.push({
    email,
    password: hashedPassword,
    name: "test",
    id: users.length + 1,
    refreshToken: refreshToken,
  }) as unknown as {
    email: string;
    password: string;
    name: string;
    id: number;
    refreshToken: string;
  };
  console.log(users, "allusers");
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
  res.send({
    message: "User registered successfully",
    user: users.find((user) => user.email === email),
    accessToken,
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  console.log(email, password, "passed line 68");
  // Find user by email in database
  const user = getUserBy(email);
  console.log(user, "user");
  // Verify password with bcrypt
  if (!user) {
    console.log(user, "user");
    res.status(401).send({ error: "Invalid email or password" });
    return;
  }
  console.log(password, user.password, "password");
  const passwordMatches = await bcrypt.compare(password, user.password);

  if (passwordMatches) {
    // Generate JWT token
    console.log(passwordMatches, "passwordMatches");
    const accessToken = jwt.sign({ userId: user!.id }, privateKey, {
      algorithm: "RS256",
      expiresIn: 300000,
    });
    const refreshToken = jwt.sign({ userId: user!.id }, privateKey, {
      algorithm: "RS256",
      expiresIn: 30000000,
    });
    const updateUser = users.find((user) => user.email === email)!;
    const updateTokens = (refreshToken: string) => {
      updateUser.refreshToken = refreshToken;
    };
    updateTokens(refreshToken);
    // Set JWT token in HttpOnly cookie and send response
    console.log(users, "users");
    // res.cookie("jwt_token", token, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.send({
      message: "User logged in successfully",
      user: users.find((user) => user.email === email),
      accessToken,
    });
  } else {
    res.status(401).send({ error: "Invalid email or password" });
  }
});

// Step 4: JWT verification middleware
type Middleware = (req: Request, res: Response, next: NextFunction) => void;
const verifyToken: Middleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "Token missing" });
  }

  try {
    jwt.verify(token, publicKey);
    next();
  } catch (error) {
    return res.status(401).send({ error: "Invalid token" });
  }
};

app.get("/protected", verifyToken, (req, res) => {
  // console.log(req.cookies.refreshToken, "req.cookies");
  // const userId = req.user.userId;
  // console.log(req.user, "req.user");
  // Use userId to retrieve user data from database
  res.send({ message: "Protected data" });
});

//client side
app.post("/refresh", verifyToken, async (req, res) => {
  console.log("fired");
  console.log(req.cookies.refreshToken, "req.cookies");
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      console.log(" no refreshToken");
      return res.status(401).send({ error: "Refresh token missing" });
    }

    const verify = jwt.verify(refreshToken, publicKey);

    if (!verify) {
      console.log("Invalid token");
      return res.status(401).send({ error: "Invalid token" });
    }

    const user = users.find((user) => user.refreshToken === refreshToken);

    if (!user) {
      console.log("User not found");
      return res.status(401).send({ error: "User not found" });
    }

    const accessToken = jwt.sign({ user: user.id }, privateKey, {
      algorithm: "RS256",
      expiresIn: 300000,
    });

    const newRefreshToken = jwt.sign({ user: user.id }, privateKey, {
      algorithm: "RS256",
      expiresIn: 30000000,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.send({
      message: "User logged in successfully",
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
