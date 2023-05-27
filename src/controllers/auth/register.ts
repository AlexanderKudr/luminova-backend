import { privateKey } from "../../config/keys";
import { Controller } from "../../types/middlewares";
import { generateTokens, hashPassword, time } from "../../utils";
import { userControllers } from "../index";

const { time30days } = time;
const { checkUserInDB, handleCreateUser } = userControllers;

const register: Controller = async (req, res) => {
  const { email, password, name } = req.body as { email: string; password: string; name: string };

  const userByEmail = await checkUserInDB("email", email);
  const userByName = await checkUserInDB("name", name);

  if (userByEmail?.email === email) {
    return res.status(400).send({ error: "User with this email already exists" });
  }

  if (userByName?.name === name) {
    return res.status(400).send({ error: "User with this name already exists" });
  }

  const { accessToken, refreshToken } = generateTokens(email, privateKey!);

  const newUser = {
    name: name,
    email: email,
    password: await hashPassword(password),
    accessToken: accessToken,
    refreshToken: refreshToken,
    confirmedemail: false,
    favoriteImages: [] as string[],
  };

  await handleCreateUser(newUser);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    // sameSite: "none",
    maxAge: time30days,
  });

  res.send({
    message: "User registered successfully",
    accessToken: accessToken,
    name: name,
  });
};
export { register };
