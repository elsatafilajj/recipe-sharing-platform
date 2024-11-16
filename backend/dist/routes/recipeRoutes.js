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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const recipeFactory_1 = __importDefault(require("../factories/recipeFactory"));
const cloudinary_1 = require("../../api/utils/cloudinary");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
// Helper function to handle image uploads
const handleImageUpload = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, cloudinary_1.uploadImage)(filePath);
        fs_1.default.unlinkSync(filePath); // Clear temp file after upload
        return result.secure_url;
    }
    catch (error) {
        throw new Error("Error uploading image: " + error);
    }
});
// Route for creating a recipe
router.post('/recipes', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, type, userId, imageUrl: providedImageUrl } = req.body;
    if (!title || !content || !userId) {
        res.status(400).json({ error: 'Title, content, and userId are required' });
        return;
    }
    try {
        const imageUrl = providedImageUrl || (req.file ? yield handleImageUpload(req.file.path) : undefined);
        const recipe = (0, recipeFactory_1.default)(type, title, content, imageUrl);
        const createdRecipe = yield prisma.recipe.create({
            data: {
                title: recipe.title,
                content: recipe.content,
                imageUrl: recipe.imageUrl,
                userId: Number(userId),
                ingredients: req.body.ingredients,
            },
        });
        res.status(201).json(createdRecipe);
    }
    catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'An error occurred while creating the recipe', details: error });
    }
}));
// Route for fetching all recipes 
router.get('/recipes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, type, difficulty } = req.query;
    const filter = {
        title: title ? { contains: title } : undefined,
        type: type ? type : undefined,
        difficulty: difficulty ? difficulty : undefined,
    };
    try {
        const recipes = yield prisma.recipe.findMany({ where: filter });
        res.json(recipes);
    }
    catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'An error occurred while fetching recipes' });
    }
}));
// Route for fetching a recipe by ID
router.get('recipes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const recipe = yield prisma.recipe.findUnique({ where: { id: Number(id) } });
        if (!recipe) {
            res.status(404).json({ error: 'Recipe not found' });
            return;
        }
        res.json(recipe);
    }
    catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).json({ error: 'An error occurred while fetching the recipe', details: error });
    }
}));
// Route for adding a favorite
router.post('/:id/favorite', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        const existingFavorite = yield prisma.favorite.findFirst({
            where: { recipeId: Number(id), userId: Number(userId) },
        });
        if (existingFavorite) {
            res.status(400).json({ error: 'Recipe already in favorites' });
            return;
        }
        const favorite = yield prisma.favorite.create({
            data: {
                recipeId: Number(id),
                userId: Number(userId),
            },
        });
        res.status(201).json(favorite);
    }
    catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({ error: 'An error occurred while adding to favorites', details: error });
    }
}));
// Route for removing a favorite
router.delete('/:id/favorite', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        yield prisma.favorite.deleteMany({
            where: {
                recipeId: Number(id),
                userId: Number(userId),
            },
        });
        res.status(200).json({ message: 'Recipe removed from favorites' });
    }
    catch (error) {
        console.error('Error removing favorite:', error);
        res.status(500).json({ error: 'An error occurred while removing from favorites', details: error });
    }
}));
//route for fetching users
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}));
exports.default = router;
