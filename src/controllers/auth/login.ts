import { privateKey } from "../../config/keys";
import { Controller } from "../../types/middlewares";
import { generateTokens } from "../../utils";
import { checkUserInDB, updateUserTokensInDB } from "../user";
import bcrypt from "bcrypt";
import { time } from "../../utils";

const { time30days } = time;

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
export { login };
