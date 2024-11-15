"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Function to create a text-only recipe
const createTextRecipe = (title, content) => ({
    title,
    content,
});
// Function to create a recipe with an image
const createImageRecipe = (title, content, imageUrl) => ({
    title,
    content,
    imageUrl,
});
// RecipeFactory function to handle recipe creation based on type
const RecipeFactory = (type, title, content, imageUrl) => {
    if (type === 'image') {
        if (!imageUrl)
            throw new Error("Image URL is required for image recipes.");
        return createImageRecipe(title, content, imageUrl);
    }
    return createTextRecipe(title, content);
};
exports.default = RecipeFactory;
