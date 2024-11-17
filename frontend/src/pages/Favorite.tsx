import React, { useEffect, useState } from 'react';
import { FiXSquare } from "react-icons/fi";
import useSWR from 'swr';

// Define the Recipe interface
interface Recipe {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  type: string;
  difficulty: string;
}

// Fetcher function for SWR to fetch data from API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Favorite: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]); // State to store IDs of favorite recipes

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';  
  const { data: recipes, error } = useSWR<Recipe[]>(`${apiUrl}/recipes`, fetcher);

  // Load favorite recipe IDs from localStorage on component mount
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

   // Function to remove a recipe from favorites
  const removeFavorite = async (recipeId: number) => {
    const updatedFavorites = favorites.filter(id => id !== recipeId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    try {
      await fetch(`${apiUrl}/recipes/${recipeId}/favorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 1 }),
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

   // Filter recipes to only show the ones marked as favorites
  const favoriteRecipes = recipes?.filter(recipe => favorites.includes(recipe.id)) || [];

  if (error) return <div>Error fetching recipes.</div>;

  return (
    <div className="max-w-7xl mx-auto p-12">
      <h1 className="text-3xl font-bold text-center text-black mb-8">
        Your Favorite Flavors: A Collection of Recipes You Love
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteRecipes.length > 0 ? (
          favoriteRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col transition transform hover:scale-105"
            >
              <div className="relative">
                {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover" />}
                <button
                  onClick={() => removeFavorite(recipe.id)}
                  className="absolute top-2 right-2 text-xl text-gray-500 hover:text-red-500"
                  aria-label="Remove from favorites"
                >
                  <FiXSquare />
                </button>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{recipe.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{recipe.content}</p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-sm font-medium text-orange-500">{recipe.type}</span>
                  <span className="text-sm text-gray-500">{recipe.difficulty}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">No favorite recipes yet.</div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
