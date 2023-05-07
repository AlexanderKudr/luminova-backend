import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).send({ error: "Access token is missing" });
    }
    try {
        jwt.verify(token, config.publicKey);
    }
    catch (error) {
        return res.status(401).send({ error: "Invalid Access Token" });
    }
    next();
};
export { verifyToken };
//# sourceMappingURL=verifytoken.js.map