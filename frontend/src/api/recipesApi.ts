// Fetches all recipes from the backend API and returns the data in JSON format.
// Throws an error if the request fails or the response status is not OK.
export const fetchRecipes = async () => {
    const response = await fetch('/api/recipes');
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    return response.json();
  };
  