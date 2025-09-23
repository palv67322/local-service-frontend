import React from 'react';
import { FaPlug, FaPaintBrush, FaWrench, FaBroom } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Electrician', icon: <FaPlug className="w-8 h-8 text-indigo-500" /> },
  { name: 'Painter', icon: <FaPaintBrush className="w-8 h-8 text-indigo-500" /> },
  { name: 'Plumber', icon: <FaWrench className="w-8 h-8 text-indigo-500" /> },
  { name: 'Cleaning', icon: <FaBroom className="w-8 h-8 text-indigo-500" /> },
];

function Categories() {
  return (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Popular Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link 
            to={`/services?category=${category.name}`} 
            key={category.name} 
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300"
          >
            {category.icon}
            <h3 className="mt-4 font-semibold text-gray-700">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;