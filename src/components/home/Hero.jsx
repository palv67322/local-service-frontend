import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      // User ko services page par search query ke saath redirect karein
      navigate(`/services?search=${searchTerm}`);
    } else {
      // Agar search box khaali hai toh seedha services page par bhej dein
      navigate('/services');
    }
  };

  return (
    <div className="bg-indigo-100">
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Find & Book Local Services Instantly
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          The best professionals in your city, just a click away.
        </p>
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
            <input
              type="text"
              className="w-full px-6 py-4 text-gray-700 focus:outline-none"
              placeholder="What service are you looking for? (e.g., plumber)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              className="px-6 py-4 bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;