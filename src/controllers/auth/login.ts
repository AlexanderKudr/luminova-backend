import { constants, config, Controller } from "../../utils";
import { jwtService, databaseService } from "../../services";
import bcrypt from "bcrypt";

const { time } = constants;
const { checkUserInDB, updateUserTokensInDB } = databaseService;
const { generateTokens } = jwtService;

const login: Controller = async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  const user = await checkUserInDB("email", email);

  if (!user) {
    return res.status(401).send({ error: "Invalid email or password" });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (passwordMatches) {
    const { accessToken, refreshToken } = generateTokens(email, config.privateKey!);
    updateUserTokensInDB({ email, accessToken, refreshToken });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: time.time30days,
    });

    res.send({
      message: `User ${user?.email} logged in successfully`,
      accessToken,
      userName: user?.name,
    });
  } else {
    res.status(401).send({ error: "Invalid email or password" });
  }
};
export { login };
