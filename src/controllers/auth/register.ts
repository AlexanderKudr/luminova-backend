import { privateKey } from "../../config/keys";
import { Controller } from "../../types/middlewares";
import { generateTokens, hashPassword, time } from "../../utils";
import { checkUserInDB, handleCreateUser } from "../user";

const { time30days } = time;

const register: Controller = async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };

  const user = await checkUserInDB("email", email);
  if (user !== null && user !== undefined) {
    return res.status(400).send({ error: "User with this email already exists" });
  }

  const { accessToken, refreshToken } = generateTokens(email, privateKey!);

  const newUser = {
    email: email,
    password: await hashPassword(password),
    accessToken: accessToken,
    refreshToken: refreshToken,
    favoriteImages: [] as string[],
  };

  await handleCreateUser(newUser);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: time30days,
  });

  res.send({
    message: "User registered successfully",
    accessToken: accessToken,
  });
};
export { register };
