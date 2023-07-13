import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  PORT,
  PUBLIC_KEY,
  PRIVATE_KEY,
} = process.env;

const config = {
  port: PORT,
  cloudinary: {
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  },
  
  publicKey: PUBLIC_KEY,
  privateKey: PRIVATE_KEY,
};


cloudinary.config(config.cloudinary);

export { config };
