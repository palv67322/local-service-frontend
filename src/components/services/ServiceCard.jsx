import React from 'react';
import { Link } from 'react-router-dom';

function ServiceCard({ service }) {
  // Agar service ki image hai toh woh dikhao, warna ek naya working placeholder dikhao
  const imageUrl = service.images && service.images.length > 0
    ? service.images[0]
    : `https://placehold.co/400x300/e2e8f0/4a5568?text=No+Image`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <img className="h-48 w-full object-cover" src={imageUrl} alt={service.name} />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
        <p className="text-sm text-gray-500 mb-2">Category: {service.category}</p>
        <p className="text-gray-600 text-base mb-4 flex-grow truncate">{service.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-indigo-600">₹{service.price}</span>
          <span className="text-sm text-gray-700">by {service.provider?.businessName || 'Provider'}</span>
        </div>
        <Link 
          to={`/services/${service._id}`} 
          className="w-full text-center bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;