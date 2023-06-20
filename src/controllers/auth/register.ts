import { privateKey } from "../../config";
import { Controller } from "../../types";
import { jwtUtils, databaseUtils, time } from "../../utils";

const { time30days } = time;
const { checkUserInDB, handleCreateUser } = databaseUtils;
const { generateTokens, hashPassword } = jwtUtils;

const register: Controller = async (req, res) => {
  const { email, password, name } = req.body as { email: string; password: string; name: string };
  console.log(email, password, name);

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
