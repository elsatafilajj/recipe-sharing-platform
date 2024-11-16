import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error('Missing required Cloudinary environment variables');
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Upload image to Cloudinary (using the buffer and file name)
export const uploadImage = async (fileBuffer: Buffer, fileName: string): Promise<{ secure_url: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        public_id: fileName,
        resource_type: 'auto', // Automatically detect file type (image, video, etc.)
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result && result.secure_url) {
          resolve({ secure_url: result.secure_url }); // Return the result with the image URL
        } else {
          reject(new Error('Upload failed, no secure_url returned'));
        }
      }
    ).end(fileBuffer); // Pass the image buffer to Cloudinary
  });
};
