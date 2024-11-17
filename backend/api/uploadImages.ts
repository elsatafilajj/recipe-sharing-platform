import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import express, { Request, Response } from 'express';

dotenv.config();

console.log('Cloud Name:', process.env.CLOUD_NAME);
console.log('API Key:', process.env.API_KEY);
console.log('API Secret:', process.env.API_SECRET);

// Check for required Cloudinary environment variables
if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error('Missing required Cloudinary environment variables');
}

// Configure Cloudinary with the loaded environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Structure of the result returned from Cloudinary
interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

// Function to upload an image to Cloudinary
const uploadImage = async (fileBuffer: Buffer, fileName: string): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        public_id: fileName,
        resource_type: 'auto', 
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (!result) {
          reject(new Error("Upload result is undefined."));
        } else {
          resolve(result as CloudinaryUploadResult); 
        }
      }
    ).end(fileBuffer); 
  });
};

// Folder path where the recipe images are stored
const folderPath = path.join('C:\\', 'Users', 'PULSE Electronics', 'Desktop', 'recipe-images');

// Function to upload images from the folder to Cloudinary 
const uploadImagesFromFolder = async (folderPath: string) => {
  try {
    const files = fs.readdirSync(folderPath); // Read all files in the folder
    for (const file of files) {
      const filePath = path.join(folderPath, file); // Get the full path of each file
      if (fs.lstatSync(filePath).isFile()) { // Check if the path is a file
        try {
          const fileBuffer = fs.readFileSync(filePath); // Read the image file into a buffer
          const result = await uploadImage(fileBuffer, file); // Upload the image to Cloudinary
          console.log(`Uploaded ${file}:`, result.secure_url); // Log the uploaded image URL
        } catch (uploadError) {
          console.error(`Error uploading ${file}:`, uploadError);
        }
      }
    }
  } catch (error) {
    console.error('Error reading folder:', error);
  }
};

// Function to handle image upload directly from a request
const uploadImageFromRequest = async (file: Express.Multer.File): Promise<string> => {
  try {
    const result = await uploadImage(file.buffer, file.originalname); // Upload the image buffer to Cloudinary
    console.log(`Uploaded ${file.originalname}:`, result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image from request:', error);
    throw error;
  }
};

// Middleware for image upload using Multer (in-memory storage for Vercel)
const upload = multer({
  storage: multer.memoryStorage(),
}).single('image');


const app = express();

// Check environment (Vercel or Local)
const isVercel = process.env.VERCEL === '1';

// Local environment: Upload images from a folder
if (!isVercel) {
  uploadImagesFromFolder(folderPath);
} else {
  // On Vercel, handle image upload via an API route using Multer
  app.post('/upload-image', upload, async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).send('No file uploaded');
        return; 
      }
      const cloudinaryUrl = await uploadImageFromRequest(req.file); 
      res.status(200).json({ url: cloudinaryUrl }); 
    } catch (error) {
      res.status(500).send('Error uploading image.');
    }
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
