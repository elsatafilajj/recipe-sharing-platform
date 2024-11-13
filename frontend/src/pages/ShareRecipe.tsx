import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { cloudName, uploadPreset } from './cloudinaryConfig';

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
      cloudinaryFormData.append('upload_preset', uploadPreset); // Use the upload preset from env
      try {
        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          cloudinaryFormData
        );
        
        // Log the full response to see everything Cloudinary returns
        console.log('Cloudinary response:', cloudinaryResponse.data);
        
        // Get the image URL from the response
        imageUrl = cloudinaryResponse.data.secure_url;
        
        // Log just the image URL
        console.log('Image URL from Cloudinary:', imageUrl);
        
        formData.append('imageUrl', imageUrl);
        
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        alert('Failed to upload image');
        return;
      }
    }

    try {
      // Send POST request to backend to create the new recipe
      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create recipe');
      }

      const newRecipe = await response.json(); // Get the newly created recipe data

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

  // Handle recipe deletion
  const handleDelete = (id: number) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };
  console.log('Cloud Name:', import.meta.env.VITE_CLOUD_NAME);
  console.log('Upload Preset:', import.meta.env.VITE_UPLOAD_PRESET);
  
  return (
    <div className="p-9 m-9 bg-gradient-to-r from-yellow-100 to-orange-100 shadow-lg rounded-xl">
      <h2 className="text-2xl text-black font-bold mb-4">Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="Recipe Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="bg-yellow-500 text-white hover:bg-orange-500 px-6 py-2 rounded">
          Submit Recipe
        </button>
      </form>

      {/* Display Recipes in a new section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-center text-black mb-6">Recipes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white shadow-lg rounded-lg p-6 mb-4 transition-transform transform hover:scale-105"
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title}</h4>
                <p className="text-gray-600 mb-2">{recipe.content}</p>
                <p className="text-gray-600 mb-2">{recipe.ingredients}</p>
                {recipe.imageUrl && (
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete Recipe
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No recipes added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareRecipe;
