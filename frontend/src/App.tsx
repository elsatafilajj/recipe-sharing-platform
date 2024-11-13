import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Favorite from './pages/Favorite';
import AboutUs from './pages/AboutUs';
import ShareRecipe from './pages/ShareRecipe';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {location.pathname === '/' && <Hero />}
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/share-recipe" element={<ShareRecipe/>} />
  <Route path="/recipes" element={<Recipes />} /> 
  <Route path="/favorites" element={<Favorite />} />
  <Route path="/about-us" element={<AboutUs />} />
  
</Routes>


        {/* Conditionally render RecipeList only for the MyRecipes page */}
        {/* {location.pathname === '/recipes' && (
          <div className="mt-8">
            <RecipeList />
          </div>
        )} */}
      </main>
      <Footer />
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
