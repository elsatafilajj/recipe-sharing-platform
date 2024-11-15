import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import recipeRoutes from '../src/routes/recipeRoutes'; // Import routes from your existing src folder

dotenv.config(); // Loading environment variables

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api', recipeRoutes); // Mount your routes

// Simple hello world route
app.get('/', (req, res) => {
  res.send('Welcome to the Recipe Sharing Platform API');
});

// Vercel specific wrapper for Express
export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);  // Pass the request and response to the Express app
};
