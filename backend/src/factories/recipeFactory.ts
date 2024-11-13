// Recipe type to define the structure for recipes
type Recipe = {
  title: string;
  content: string;
  imageUrl?: string; 
};

// Function to create a text-only recipe
const createTextRecipe = (title: string, content: string): Recipe => ({
  title,
  content,
});

// Function to create a recipe with an image
const createImageRecipe = (title: string, content: string, imageUrl: string): Recipe => ({
  title,
  content,
  imageUrl,
});

// RecipeFactory function to handle recipe creation based on type
const RecipeFactory = (type: 'text' | 'image', title: string, content: string, imageUrl?: string): Recipe => {
  if (type === 'image') {
    if (!imageUrl) throw new Error("Image URL is required for image recipes.");
    return createImageRecipe(title, content, imageUrl);
  }
  return createTextRecipe(title, content);
};

export default RecipeFactory;



