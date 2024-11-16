import { PrismaClient } from '@prisma/client'; 
import * as dotenv from 'dotenv'; 
import { v2 as cloudinary } from 'cloudinary'; 
import fs from 'fs'; 
import path from 'path'; 


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

// structure of the result returned from Cloudinary 
interface CloudinaryUploadResult {
  secure_url: string; 
  public_id: string; 
}

// Function to upload an image to Cloudinary
// Returns a Promise with the URL of the image
const uploadImage = async (filePath: string): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) {
        reject(error); 
      } else if (!result) {
        reject(new Error("Upload result is undefined.")); 
      } else {
        resolve(result as CloudinaryUploadResult); // Resolve the promise with the upload result
      }
    });
  });
};

//  folder path where the recipe images are stored
const folderPath = path.join('C:\\', 'Users', 'PULSE Electronics', 'Desktop', 'recipe-images');

// function to upload images from the folder to Cloudinary
const uploadImagesFromFolder = async (folderPath: string) => {
  try {
    const files = fs.readdirSync(folderPath); // Read all files in the folder
    for (const file of files) {
      const filePath = path.join(folderPath, file); // Get the full path of each file
      if (fs.lstatSync(filePath).isFile()) { // Check if the path is a file
        try {
          const result = await uploadImage(filePath); // upload the image to Cloudinary
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

// Execute the upload function to upload all images in the folder
uploadImagesFromFolder(folderPath);
