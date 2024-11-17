import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Recipe {
  id: number;
  title: string;
  content: string;
  ingredients: string;
  imageUrl?: string;
  type: string;
}

const ShareRecipe: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Load saved recipes from localStorage when the component mounts
  useEffect(() => {
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that all required fields are filled in
    if (!title || !content || !ingredients) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('ingredients', ingredients);
    formData.append('type', image ? 'image' : 'text');
    formData.append('userId', '1'); // Assuming a user ID of '1'

    let imageUrl = '';

    if (image) {
      // Upload the image to Cloudinary
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('file', image);
      cloudinaryFormData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET); // Use the upload preset from env
      try {
        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
          cloudinaryFormData
        );
        
        // Get the image URL from the response
        imageUrl = cloudinaryResponse.data.secure_url;
        
        formData.append('imageUrl', imageUrl);
        
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        alert('Failed to upload image');
        return;
      }
    }

    try {
      // Send POST request to backend to create the new recipe
      const response = await fetch(`${import.meta.env.VITE_API_URL}/recipes`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create recipe');
      }

      const newRecipe = await response.json(); 

      // Update state with the new recipe
      setRecipes((prevRecipes) => {
        const updatedRecipes = [newRecipe, ...prevRecipes];
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
        return updatedRecipes;
      });

      setTitle('');
      setContent('');
      setIngredients('');
      setImage(null);

      console.log('Recipe created successfully!');
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  // Handle deleting a recipe
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/recipes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }

      const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
      setRecipes(updatedRecipes);

      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
      console.log(`Recipe with id ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-orange-100 via-orange-200 to-yellow-100 min-h-screen">
      <h1 className="text-4xl font-semibold text-center mb-8 text-orange-600 drop-shadow-lg">Share Your Recipe</h1>

      {/* Recipe Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-white p-8 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="space-y-4">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 transition duration-300 ease-in-out hover:bg-orange-50"
            required
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="content" className="block text-lg font-medium text-gray-700">
            Recipe Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 transition duration-300 ease-in-out hover:bg-orange-50"
            required
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="ingredients" className="block text-lg font-medium text-gray-700">
            Ingredients
          </label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 transition duration-300 ease-in-out hover:bg-orange-50"
            required
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="image" className="block text-lg font-medium text-gray-700">
            Recipe Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            className="w-full border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out hover:bg-gray-50"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-400 focus:ring-4 focus:ring-orange-200 transition-all duration-300"
        >
          Share Recipe
        </button>
      </form>

      {/* Recipe List */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <img
              src={recipe.imageUrl || '/assets/default-image.jpg'}
              alt={recipe.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">{recipe.title}</h3>
              <p className="text-gray-600 mt-2">{recipe.content}</p>
              <button
                onClick={() => handleDelete(recipe.id)}
                className="mt-4 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-400 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShareRecipe;
