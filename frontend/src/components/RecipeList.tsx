import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { FaHeart } from "react-icons/fa";
import { FiXSquare } from "react-icons/fi";
import { Label } from '@radix-ui/react-label';
import * as Dialog from '@radix-ui/react-dialog'; // Radix UI Dialog components

// Defining the structure of a Recipe
interface Recipe {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  type: string;
  difficulty: string;
  ingredients: string;
}

// Fetcher function for SWR to retrieve data from the backend
const fetcher = (url: string) => fetch(url).then(res => res.json());

const RecipeList: React.FC = () => {
  // Use SWR to fetch recipes from the backend
  const { data: recipes, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/recipes`, 
    fetcher
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null); 

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  // Handle adding/removing a recipe from favorites
  const handleFavorite = async (recipeId: number) => {
    const updatedFavorites = favorites.includes(recipeId)
      ? favorites.filter(id => id !== recipeId)
      : [...favorites, recipeId];
  
    
    setFavorites(updatedFavorites);
   
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  
    try {
      const userId = 1; 
  
      const method = favorites.includes(recipeId) ? 'DELETE' : 'POST';
  
      // Fetch API call with dynamic URL
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${recipeId}/favorite`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }), 
      });
  
      if (!response.ok) {
        throw new Error('Failed to update favorite');
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };
  

  // Handle recipe click to open details in modal
  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  if (error) return <div>Error loading recipes</div>;
  if (!recipes) return <div>Loading...</div>;

  const filteredRecipes = recipes.filter((recipe: Recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-9">
      <h2 className="text-4xl font-bold text-center text-black mb-8">
        Get Inspired for your next meal
      </h2>
      <Label className="block mb-2 text-lg font-semibold  text-gray-700"></Label>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 mb-6 border transition duration-300 ease-in-out transform hover:scale-105 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe: Recipe) => (
          <div
            key={recipe.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col transition transform hover:scale-105"
          >
            <div className="relative">
              {recipe.imageUrl && (
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <button
                onClick={() => handleFavorite(recipe.id)}
                className={`absolute top-2 right-2 text-2xl transition-colors duration-200 ${favorites.includes(recipe.id) ? 'text-red-500' : 'text-gray-400'}`}
                aria-label="Add to favorites"
              >
                <FaHeart />
              </button>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{recipe.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{recipe.content}</p>

              <div className="mt-auto flex justify-between items-center">
                <span className="text-sm font-medium text-orange-500">{recipe.type}</span>
                <span className="text-sm text-gray-500">{recipe.difficulty}</span>
              </div>

              <button
                onClick={() => handleRecipeClick(recipe)}
                className="text-sm text-orange-500 mt-2 font-bold"
              >
                Show Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal (Dialog) */}
      {selectedRecipe && (
        <Dialog.Root open={selectedRecipe !== null} onOpenChange={(open) => open || setSelectedRecipe(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
            <Dialog.Content className="fixed inset-0 flex items-center justify-center z-50 bg-orange-100 max-w-3xl p-8 rounded-lg">
              <Dialog.Close asChild>
                <button className="absolute top-4 right-4 text-3xl text-gray-700 hover:text-gray-900">
                  <FiXSquare />
                </button>
              </Dialog.Close>
              {/* Modal Content */}
              <h2 className="text-3xl font-semibold mb-6 text-center">{selectedRecipe.title} Details</h2>
              <div className="text-lg space-y-2">
                <p className="font-semibold">Ingredients:</p>
                <div>
                  {selectedRecipe.ingredients
                    .split('•')
                    .map((ingredient, index) => {
                      if (
                        ingredient.includes('Preparation Time:') ||
                        ingredient.includes('Cooking Time:') ||
                        ingredient.includes('Total Time:')
                      ) {
                        return null;
                      }
                      return (
                        <span key={index}>
                          • {ingredient.trim()}
                          {index !== selectedRecipe.ingredients.split('•').length - 1 && <br />}
                        </span>
                      );
                    })}
                </div>
              </div>
              <div className="mt-4 text-lg space-y-2">
                <p className="font-semibold">Time Information:</p>
                <div>
                  {selectedRecipe.ingredients
                    .split('•')
                    .map((ingredient, index) => {
                      if (
                        ingredient.includes('Preparation Time:') ||
                        ingredient.includes('Cooking Time:') ||
                        ingredient.includes('Total Time:')
                      ) {
                        return (
                          <span key={index} className="block">
                            {ingredient.trim()}
                          </span>
                        );
                      }
                      return null;
                    })}
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </div>
  );
};

export default RecipeList;
