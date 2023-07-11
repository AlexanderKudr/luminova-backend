import * as dotenv from "dotenv";
import { privateKey, publicKey } from "./keys";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, PORT } = process.env;

const config = {
  port: PORT,
  cloudinary: {
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  },
  publicKey: publicKey,
  privateKey: privateKey,
};

cloudinary.config(config.cloudinary);

export { config, privateKey, publicKey };
