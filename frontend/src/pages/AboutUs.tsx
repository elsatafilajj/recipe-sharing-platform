import React from 'react';
import useSWR from 'swr';

// Fetcher function to handle API requests
const fetcher = (url: string) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  return fetch(`${baseUrl}${url}`).then((res) => res.json());
};

const AboutUs: React.FC = () => {
  // Fetch users from the backend
  const { data: users, error } = useSWR('/users', fetcher);

  return (
    <div className="p-8 m-10">
      {/* Hero section */}
      <div
        className="relative transition duration-300 ease-in-out transform hover:scale-105 w-full h-96 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/assets/about.us.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
        </div>
      </div>

      {/* About Us Section */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-gray-400 mb-6">Discover the passion behind our recipe-sharing platform.</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          At Recipe’Nest Cook, we aim to bring people together through the joy of cooking. Whether you're a beginner or a seasoned chef,
          our platform provides you with a space to share your favorite recipes, explore new ones, and connect with others who
          share your passion for food. We believe that great meals are made even better when shared, and our goal is to create
          a community where anyone can find inspiration and creativity in the kitchen.
        </p>
      </div>

      {/* Cards Section */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white transition duration-300 ease-in-out transform hover:scale-105 rounded-lg shadow-lg overflow-hidden">
          <img
            src="/assets/img1.jpg"
            alt="Cooking together"
            className="w-full h-64 object-cover"
          />
          <div className="p-4 ">
            <h3 className="text-xl font-semibold text-gray-800">Cooking Together</h3>
            <p className="text-gray-600 mt-2">
              Share your family recipes or discover new ones created by fellow cooking enthusiasts from around the world.
            </p>
          </div>
        </div>
        <div className="bg-white transition duration-300 ease-in-out transform hover:scale-105 rounded-lg shadow-lg overflow-hidden">
          <img
            src="/assets/img2.jpg"
            alt="Delicious dishes"
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800">Delicious Dishes</h3>
            <p className="text-gray-600 mt-2">
              Explore a wide variety of recipes, from healthy options to indulgent treats, and everything in between.
            </p>
          </div>
        </div>
        <div className="bg-white transition duration-300 ease-in-out transform hover:scale-105 rounded-lg shadow-lg overflow-hidden">
          <img
            src="/assets/img3.jpg"
            alt="Fresh Ingredients"
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800">Fresh Ingredients</h3>
            <p className="text-gray-600 mt-2">
              Discover tips for sourcing the freshest ingredients and turning them into mouthwatering meals for any occasion.
            </p>
          </div>
        </div>
      </div>

      {/* YouTube Section */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-400 mb-4">Want to Learn More ?</h2>
        <p className="text-gray-600 mb-6">Subscribe to our YouTube channel for detailed recipes and more cooking inspiration!</p>
        <a
          href="https://www.youtube.com/channel/your-channel-id"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-500 transition"
        >
          Visit Our YouTube Channel
        </a>
      </div>

      {/* Fetch and Display Users */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-400 mb-6">Meet Our Community</h2>
        {error && <p className="text-red-500">Failed to load users.</p>}
        {!users && !error && <p className="text-gray-600">Loading users...</p>}
        {users && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {users.map((user: { id: number; name: string; email: string }) => (
              <div key={user.id} className="bg-white transition duration-300 ease-in-out transform hover:scale-105 rounded-lg shadow-lg p-4">
                <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                <p className="text-gray-600 mt-2">{user.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
