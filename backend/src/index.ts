import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import recipeRoutes from '../src/routes/recipeRoutes';
import { VercelRequest, VercelResponse } from '@vercel/node';

// Load environment variables
dotenv.config();

// Initialize Prisma Client
const prisma = new PrismaClient();

// Initialize Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());

// API Routes
app.use('/api', recipeRoutes);

// Default route for testing
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Recipe Sharing Platform API');
});

// Vercel handler
const vercelHandler = (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'GET' && req.url === '/') {
    return res.status(200).json({ message: 'Hello from the API!' });
  }

  app(req as any, res as any); // Delegate all requests to Express
};

// Start server locally (for development only)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export for Vercel deployment
export default vercelHandler;
