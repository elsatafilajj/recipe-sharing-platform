import { v2 as cloudinary } from 'cloudinary';

// required cloudinary environment variables are set
if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error('Missing required Cloudinary environment variables');
}

// configure cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// function to upload an image to cloudinary
export const uploadImage = async (filePath: string) => {
  return cloudinary.uploader.upload(filePath); // Upload image and return the result
};