"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
// required cloudinary environment variables are set
if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
    throw new Error('Missing required Cloudinary environment variables');
}
// configure cloudinary using environment variables
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
// function to upload an image to cloudinary
const uploadImage = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    return cloudinary_1.v2.uploader.upload(filePath); // Upload image and return the result
});
exports.uploadImage = uploadImage;
