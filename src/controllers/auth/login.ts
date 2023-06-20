import { privateKey } from "../../config";
import { Controller } from "../../types";
import { jwtUtils, databaseUtils, time } from "../../utils";
import bcrypt from "bcrypt";

const { time30days } = time;
const { checkUserInDB, updateUserTokensInDB } = databaseUtils;
const { generateTokens } = jwtUtils;

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

    console.log("about to set cookie");
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      // sameSite: "lax",
      maxAge: time30days,
    });

    res.send({
      message: `User ${user?.email} logged in successfully`,
      accessToken,
      name: user?.name,
    });
  } else {
    res.status(401).send({ error: "Invalid email or password" });
  }
};
export { login };
