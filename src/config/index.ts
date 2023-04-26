import * as dotenv from "dotenv";
dotenv.config();

const {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  PORT,
  PRIVATE_KEY,
  PUBLIC_KEY,
} = process.env;
const config = {
  port: PORT,
  corsOptions: { origin: "http://localhost:5173", credentials: true },
  cloudinary: {
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  },
  publicKey: PUBLIC_KEY,
  privateKey: PRIVATE_KEY,
};

export { config };
