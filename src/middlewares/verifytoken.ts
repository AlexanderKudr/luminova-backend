import jwt_decode from "jwt-decode";
import { Middleware } from "../types/middlewares";

const verifyToken: Middleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "Access token is missing" });
  }
  
  try {
    const decodedToken = jwt_decode<any>(token);

    if (decodedToken.exp < Date.now() / 1000) {
      return res.status(401).send({ error: "Access token expired" });
    }
  } catch (error) {
    return res.status(401).send({ error: "Invalid Access Token" });
  }
  next();
};

export { verifyToken };