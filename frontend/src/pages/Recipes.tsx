import React from 'react';
import RecipeList from '../components/RecipeList';

const Recipes: React.FC = () => {
  return (
    <div className="p-6 ">
      <RecipeList /> {/* Rendering the RecipeList component inside the div */}
    </div>
  );
};

export default Recipes;
