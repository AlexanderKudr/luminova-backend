import { constants, config, Controller, User } from "../../utils";
import { databaseService, jwtService } from "../../services";

const { time } = constants;
const { checkUserInDB, handleCreateUser } = databaseService;
const { generateTokens, hashPassword } = jwtService;

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

  const { accessToken, refreshToken } = generateTokens(email, config.privateKey!);

  const newUser: User = {
    name: name,
    email: email,
    password: await hashPassword(password),
    accessToken: accessToken,
    refreshToken: refreshToken,
    confirmedemail: false,
    favoriteImages: [],
  };

  await handleCreateUser(newUser);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    // sameSite: "none",
    maxAge: time.time30days,
  });

  res.send({
    message: "User registered successfully",
    accessToken: accessToken,
    userName: name,
  });
};
export { register };
