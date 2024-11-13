// TypeScript declaration for Cloudinary to define its API
declare module 'cloudinary' {
  export const v2: {
    config: (config: { cloud_name: string; api_key: string; api_secret: string }) => void; // Configure Cloudinary
    uploader: {
      upload: (filePath: string, callback: (error: any, result: any) => void) => void; // Upload method for images
    };
  };
}
