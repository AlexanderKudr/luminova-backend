import { privateKey } from "../routes/auth/keys/privateKey.js";
import { publicKey } from "./../routes/auth/keys/publicKey.js";
import * as dotenv from "dotenv";
dotenv.config();

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, PORT } = process.env;
const config = {
  port: PORT,
  corsOptions: { origin: "http://localhost:5173", credentials: true },
  cloudinary: {
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  },
  publicKey: publicKey,
  privateKey: privateKey,
};

export { config };
