//This component provides the main navigation bar for the application.
//The navigation bar includes links to Home, Recipes, Favorites, About Us, and Share Recipe pages.
//Accessibility is enhanced by specifying aria-labels for assistive technologies.

 import React from 'react';
import { NavLink } from 'react-router-dom';


const Navbar: React.FC = () => {

  return (
    <nav
      aria-label="Main navigation"    // Accessibility improvement, specifying this as the main navigation
      className="fixed top-0 w-full p-4 flex justify-between items-center z-10"
    >
      <NavLink to="/" className="flex items-center">
        <img
          src="/assets/loggo.png"
          alt="Logo"
          className="h-10 w-auto"
        />
      </NavLink>

      <div className="space-x-6 flex items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-lg font-bold text-[#ffc635] transition duration-300 hover:text-yellow-400 transform hover:scale-105 ${
              isActive ? 'text-yellow-400 underline underline-offset-4' : ''
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
  to="/recipes" 
  className={({ isActive }) =>
    `text-lg font-bold text-[#ffc635] transition duration-300 hover:text-yellow-400 transform hover:scale-105 ${
      isActive ? 'text-yellow-400 underline underline-offset-4' : ''
    }`
  }
>
  Recipes
</NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `text-lg font-bold text-[#ffc635] transition duration-300 hover:text-yellow-400 transform hover:scale-105 ${
              isActive ? 'text-yellow-400 underline underline-offset-4' : ''
            }`
          }
        >
          Favorite
        </NavLink>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            `text-lg font-bold text-[#ffc635] transition duration-300 hover:text-yellow-400 transform hover:scale-105 ${
              isActive ? 'text-yellow-400 underline underline-offset-4' : ''
            }`
          }
        >
          About Us
        </NavLink>
        <NavLink
          to="/share-recipe"
          className={({ isActive }) =>
            `bg-yellow-500 px-4 py-2 rounded-full text-white font-semibold hover:bg-yellow-600 transition duration-200 shadow-md transform hover:scale-105 ${
              isActive ? 'bg-yellow-500' : ''
            }`
          }
        >
          + Share a Recipe
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
