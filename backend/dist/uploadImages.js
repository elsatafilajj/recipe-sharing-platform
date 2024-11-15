"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv.config();
console.log('Cloud Name:', process.env.CLOUD_NAME);
console.log('API Key:', process.env.API_KEY);
console.log('API Secret:', process.env.API_SECRET);
// Check for required Cloudinary environment variables
if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
    throw new Error('Missing required Cloudinary environment variables');
}
// Configure Cloudinary with the loaded environment variables
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
// Function to upload an image to Cloudinary
// Returns a Promise with the URL of the image
const uploadImage = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(filePath, (error, result) => {
            if (error) {
                reject(error);
            }
            else if (!result) {
                reject(new Error("Upload result is undefined."));
            }
            else {
                resolve(result); // Resolve the promise with the upload result
            }
        });
    });
});
//  folder path where the recipe images are stored
const folderPath = path_1.default.join('C:\\', 'Users', 'PULSE Electronics', 'Desktop', 'recipe-images');
// function to upload images from the folder to Cloudinary
const uploadImagesFromFolder = (folderPath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = fs_1.default.readdirSync(folderPath); // Read all files in the folder
        for (const file of files) {
            const filePath = path_1.default.join(folderPath, file); // Get the full path of each file
            if (fs_1.default.lstatSync(filePath).isFile()) { // Check if the path is a file
                try {
                    const result = yield uploadImage(filePath); // upload the image to Cloudinary
                    console.log(`Uploaded ${file}:`, result.secure_url); // Log the uploaded image URL
                }
                catch (uploadError) {
                    console.error(`Error uploading ${file}:`, uploadError);
                }
            }
        }
    }
    catch (error) {
        console.error('Error reading folder:', error);
    }
});
// Execute the upload function to upload all images in the folder
uploadImagesFromFolder(folderPath);
