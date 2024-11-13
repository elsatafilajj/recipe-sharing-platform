// Footer component for Recipe'Nest website
// Displays social media links, legal notices, and copyright information
// The footer is styled with a yellow background and white text. Social media icons
// are imported from react-icons and are styled with hover effects.
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; 

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F7B731] text-gray-800 py-10 mt-16">
      <div className="max-w-screen-xl mx-auto px-6 text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-white">Recipe'Nest</h1>
          <p className="text-sm text-white mt-2">Your favorite place to discover and share recipes.</p>
        </div>
        
        <div className="flex justify-center space-x-6 mb-8">
          <a href="https://www.facebook.com" aria-label="Facebook" className="text-white hover:text-gray-200 transition duration-300 ease-in-out">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" className="text-white hover:text-gray-200 transition duration-300 ease-in-out">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" className="text-white hover:text-gray-200 transition duration-300 ease-in-out">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" className="text-white hover:text-gray-200 transition duration-300 ease-in-out">
            <FaLinkedin size={24} />
          </a>
        </div>

        <div className="flex justify-center space-x-8 mb-6">
          <a href="/privacy-policy" className="text-white hover:text-gray-200 transition duration-300 ease-in-out">Privacy Policy</a>
          <a href="/terms" className="text-white hover:text-gray-200 transition duration-300 ease-in-out">Terms of Service</a>
          <a href="/contact" className="text-white hover:text-gray-200 transition duration-300 ease-in-out">Contact</a>
        </div>
        
        <p className="text-sm text-white">
          &copy; {new Date().getFullYear()} Recipe’Nest. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
