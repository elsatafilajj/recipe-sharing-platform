import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import RecipeFactory from '../factories/recipeFactory';
import { uploadImage } from '../utils/cloudinary';
import multer from 'multer';
import fs from 'fs';

const router = Router();
const prisma = new PrismaClient();

// Use memory storage for file uploads
const upload = multer({ storage: multer.memoryStorage() }).single('image');

// Middleware to enable CORS for Vercel
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  next();
});

interface CreateRecipeRequest {
  title: string;
  content: string;
  type: 'text' | 'image';
  userId: string;
  imageUrl?: string;
  ingredients: string;
}

// Helper function to handle image uploads
const handleImageUpload = async (fileBuffer: Buffer, fileName: string): Promise<string> => {
  try {
    const result = await uploadImage(fileBuffer, fileName); 
    return result.secure_url; 
  } catch (error) {
    throw new Error('Error uploading image: ' + error);
  }
};

// Route for creating a recipe
router.post('/recipes', upload, async (req: Request<{}, {}, CreateRecipeRequest>, res: Response): Promise<void> => {
  const { title, content, type, userId, imageUrl: providedImageUrl } = req.body;

  if (!title || !content || !userId) {
    res.status(400).json({ error: 'Title, content, and userId are required' });
    return;
  }

  try {
    const imageUrl = providedImageUrl || (req.file ? await handleImageUpload(req.file.buffer, req.file.originalname) : undefined);
    const recipe = RecipeFactory(type, title, content, imageUrl);

    const createdRecipe = await prisma.recipe.create({
      data: {
        title: recipe.title,
        content: recipe.content,
        imageUrl: recipe.imageUrl,
        userId: Number(userId),
        ingredients: req.body.ingredients,
      },
    });

    res.status(201).json(createdRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'An error occurred while creating the recipe', details: error });
  }
});

// Route for fetching all recipes
router.get('/recipes', async (req: Request, res: Response): Promise<void> => {
  const { title, type, difficulty } = req.query;

  const filter: any = {
    title: title ? { contains: title as string } : undefined,
    type: type ? (type as string) : undefined,
    difficulty: difficulty ? (difficulty as string) : undefined,
  };

  try {
    const recipes = await prisma.recipe.findMany({ where: filter });
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'An error occurred while fetching recipes' });
  }
});

// Route for updating a recipe by ID
router.put('/recipes/:id', upload, async (req: Request<{ id: string }, {}, Partial<CreateRecipeRequest>>, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, content, type, userId, ingredients } = req.body;

  try {
    const recipe = await prisma.recipe.findUnique({ where: { id: Number(id) } });

    if (!recipe) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }

    // Handle image update if a new file is provided
    let imageUrl = recipe.imageUrl;
    if (req.file) {
      imageUrl = await handleImageUpload(req.file.buffer, req.file.originalname);
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id: Number(id) },
      data: {
        title: title ?? recipe.title,
        content: content ?? recipe.content,

        imageUrl,
        ingredients: ingredients ?? recipe.ingredients,
      },
    });

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'An error occurred while updating the recipe', details: error });
  }
});


// Route for fetching a recipe by ID
router.get('/recipes/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const recipe = await prisma.recipe.findUnique({ where: { id: Number(id) } });

    if (!recipe) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }

    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'An error occurred while fetching the recipe', details: error });
  }
});



// Route for deleting a recipe by ID
router.delete('/recipes/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedRecipe = await prisma.recipe.delete({
      where: { id: Number(id) },
    });

    if (!deletedRecipe) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'An error occurred while deleting the recipe', details: error });
  }
});


// Route for adding a recipe as a favorite
router.post('/api/:id/favorite', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params; // Recipe ID
  const { userId } = req.body; // User ID from the request body

  if (!userId) {
    res.status(400).json({ error: 'User ID is required' });
    return;
  }

  try {
    const recipe = await prisma.recipe.findUnique({ where: { id: Number(id) } });
    if (!recipe) {
      return ;
    }

    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!user) {
      return ;
    }

    const existingFavorite = await prisma.favorite.findFirst({
      where: { recipeId: Number(id), userId: Number(userId) },
    });

    if (existingFavorite) {
      return ;
    }

    const favorite = await prisma.favorite.create({
      data: {
        recipeId: Number(id),
        userId: Number(userId),
      },
    });

    res.status(201).json(favorite);
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: 'An error occurred while adding to favorites', details: error });
  }
});

// Route for removing a recipe from favorite
router.delete('/api/:id/favorite', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ error: 'User ID is required' });
    return;
  }

  try {
    const deletedFavorite = await prisma.favorite.deleteMany({
      where: {
        recipeId: Number(id),
        userId: Number(userId),
      },
    });

    if (deletedFavorite.count === 0) {
      return;
    }

    res.status(200).json({ message: 'Recipe removed from favorites' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ error: 'An error occurred while removing from favorites', details: error });
  }
});


// Route for fetching users
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;
