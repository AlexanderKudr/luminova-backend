import { Request, Response } from "express";
import { createSession, getUserBy, invalidateSession } from "./db.js";
import { signJWT, verifyJWT } from "./utils.js";
type UserData = { email: string; password: string };
const createNewSession = (req: Request, res: Response) => {
  const { email, password }: UserData = req.body;
  const user = getUserBy(email);

  if (!user || user.password !== password) {
    return res.status(401).send("Invalid email or password");
  }
  const session = createSession(email, user.name);
  const { sessionId, email: userEmail, name } = session;
  const tokens = {
    accessToken: signJWT({ email: userEmail, name: name, sessionId: sessionId }, "5s"),
    refreshToken: signJWT({ sessionId: sessionId }, "30d"),
  };

  res.cookie("accessToken", tokens.accessToken, {
    maxAge: 300000, //5 min
    httpOnly: true,
  });
  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: 3.15e10,
    httpOnly: true,
  });
  return res.send(verifyJWT(tokens.accessToken));
};
const deleteSession = (req: Request, res: Response) => {
  res.cookie("accessToken", "", { maxAge: 0, httpOnly: true });
  res.cookie("refreshToken", "", { maxAge: 0, httpOnly: true });
  return res.send({ success: true });
};
export { createNewSession, deleteSession };
