import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import recipeRoutes from './routes/recipeRoutes';
import { VercelRequest, VercelResponse } from '@vercel/node';
import multer from 'multer';

// Load environment variables
dotenv.config();

// Initialize Prisma Client
const prisma = new PrismaClient();

// Initialize Express app
const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173', // Development frontend
  process.env.FRONTEND_URL || 'https://recipe-sharing-platform-one.vercel.app', // Production frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true, // Allow credentials (cookies, etc.)
  })
);

app.use(express.json());

// Initialize multer with memory storage (for Vercel)
const upload = multer({ storage: multer.memoryStorage() });

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

  // Delegate all requests to Express
  app(req as any, res as any);
};

// Export for Vercel deployment
export default vercelHandler;

// Start server locally (for development only)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
