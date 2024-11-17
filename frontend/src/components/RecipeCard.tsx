//This component represents an individual recipe card that displays the recipe's title and image.
import React from 'react';

interface RecipeCardProps {
  title: string;
  imageUrl: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, imageUrl }) => {
  return (
    <div className="bg-white border transition duration-300 ease-in-out transform hover:scale-105 w-full border-gray-200 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <img src={imageUrl} alt={title} className="w-full h-56 object-cover" />
      <div className="p-5 w-full">
        <h2 className="font-semibold text-2xl text-gray-800 mb-3">{title}</h2>
        <button className="w-full text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition duration-200">
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
