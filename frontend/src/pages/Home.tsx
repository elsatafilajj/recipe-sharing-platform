import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import * as RadixSlider from '@radix-ui/react-slider';
import RecipeList from '../components/RecipeList';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: React.FC = () => {
  const { data: recipes, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/recipes`, 
    fetcher
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay effect with setInterval
  useEffect(() => {
    if (!recipes || recipes.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [recipes]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 w-full">
      <section id="recipes" className="flex-1 p-8 w-full">
        {error && (
          <div className="text-center text-red-600">
            Failed to load recipes.{' '}
            <button className="text-blue-600 underline" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        )}
        {isLoading && !error && (
          <div className="text-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" />
            Loading...
          </div>
        )}

        {recipes && (
          <div className="flex flex-col transition duration-300 ease-in-out transform hover:scale-105 items-center">
            <div className="w-full max-w-4xl mx-auto overflow-hidden shadow-lg">
              <img
                src={recipes[currentIndex]?.imageUrl || '/default-image.jpg'} // Fallback image
                alt={`Recipe ${recipes[currentIndex]?.id}`}
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Radix Slider for navigating images */}
            <RadixSlider.Root
              className="w-full  max-w-5xl mt-4"
              min={0}
              max={recipes.length - 1}
              step={1}
              value={[currentIndex]}
              onValueChange={(value) => setCurrentIndex(value[0])}
            >
              <RadixSlider.Track className="relative h-4 bg-gray-200 rounded-full">
                <RadixSlider.Range className="absolute h-full bg-blue-600 rounded-full" />
              </RadixSlider.Track>
              <RadixSlider.Thumb className="w-6 h-6 bg-blue-600 rounded-full" />
            </RadixSlider.Root>
          </div>
        )}
      </section>
      <RecipeList />
    </div>
  );
};

export default Home;
