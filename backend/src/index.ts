import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import { PrismaClient } from '@prisma/client'; 
import recipeRoutes from './routes/recipeRoutes'; 
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hello from the API!' });
  } else {
    res.status(405).send({ message: 'Method Not Allowed' });
  }
};

dotenv.config(); // loading environment variables from .env file
const app = express(); // initializing Express application
const prisma = new PrismaClient(); // creating a Prisma Client instance to interact with the database

app.use(cors()); // used CORS middleware for handling cross-origin requests
app.use(express.json()); // used JSON middleware to parse incoming JSON requests

// Use the recipe routes for the API under the /api/recipes path
app.use('/api', recipeRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Recipe Sharing Platform API'); 
});
// here starts the server to port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); 
});
