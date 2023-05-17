import { Controller } from "../../types/middlewares";

const protectedAccess: Controller = (req, res) => {
  try {
    res.send({ message: "Protected access successfully" });
  } catch (error) {
    res.status(500).send({ error: "Protected access error" });
  }
};
export { protectedAccess };