import { Controller } from "../../utils";

const updateUserData: Controller = async (req, res) => {
  const { refreshToken }: { refreshToken: string } = req.cookies;
  const payload = req.body as {};
};

export { updateUserData };
