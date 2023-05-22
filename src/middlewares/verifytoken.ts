import jwt from "jsonwebtoken";
import { Middleware } from "../types/middlewares";
import { config } from "../config";

const verifyToken: Middleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "Access token is missing" });
  }

  try {
    jwt.verify(token, config.publicKey!);
  } catch (error) {
    return res.status(401).send({ error: "Invalid Access Token" });
  }
  next();
  
};
export { verifyToken };
