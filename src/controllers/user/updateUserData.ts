import { Controller } from "../../utils/types";

const updateUserData: Controller = async (req, res) => {
  const { refreshToken }: { refreshToken: string } = req.cookies;
  const payload = req.body as {};
};

export { updateUserData };
