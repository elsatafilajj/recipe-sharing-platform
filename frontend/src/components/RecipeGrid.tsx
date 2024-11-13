//This component is responsible for displaying a grid of RecipeCard components, each representing an individual recipe.
import React from 'react';
import RecipeCard from './RecipeCard';

interface Recipe {
  id: number;
  title: string;
  imageUrl: string;
}

const RecipeGrid: React.FC<{ recipes: Recipe[] }> = ({ recipes }) => {
  return (
    <section className="p-6 bg-gray-100 mt-16 w-full">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Discover New Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id}
              title={recipe.title}
              imageUrl={recipe.imageUrl}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">No recipes available</div>
        )}
      </div>
    </section>
  );
};

export default RecipeGrid;
