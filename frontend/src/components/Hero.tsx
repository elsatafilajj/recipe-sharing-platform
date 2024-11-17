// Hero component for the landing page of the Recipe'Nest website
// This component displays a large hero section with a background image, heading, subheading, and call-to-action button
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
    const navigate = useNavigate();  // 'useNavigate' hook allows us to programmatically navigate to other routes
  
    const handleExploreClick = () => {
      navigate('/recipes');       // Navigate to the /recipes page when the button is clicked
    };
  return (
    <header
      className="bg-gradient-to-r from-[#e7995a] to-[#F1C9A6] text-gray-800 py-48 px-4 text-center relative"  // Increased padding
      style={{
        backgroundImage: 'url(/assets/bck.jpg)',  
        backgroundSize: 'cover', 
        backgroundPosition: 'center center', 
        backgroundAttachment: 'fixed', 
      }}
    >

      <h1 className="text-6xl   md:text-7xl font-extrabold mb-6 text-white drop-shadow-lg">
        Connect with our{' '}
        <span className="text-[#F7B731]">cooking</span> community
      </h1>

      <p className="text-lg md:text-xl font-semibold mb-4 leading-relaxed text-white opacity-80">
        Discover and share amazing recipes with the world.
      </p>
      <button
      onClick={handleExploreClick}
      className="bg-gradient-to-r from-[#FFD166] to-[#F7B731] text-white px-8 py-4 rounded-full text-xl font-semibold transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md"
    >
      Explore Recipes
    </button>
    </header>
  );
};

export default Hero;
