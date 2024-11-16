import { Request } from 'express';

declare module 'express' {
  // Extend the Express Request interface to optionally include the 'file' property (for file uploads)
  interface Request {
    file?: Express.Multer.File; // Make the file property optional
  }
}
