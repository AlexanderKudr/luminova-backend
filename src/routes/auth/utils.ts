import bcrypt from "bcrypt";

const time = {
  time5minutes: 60 * 5,
  time30days: 60 * 60 * 24 * 30,
};
const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export { hashPassword, time };
