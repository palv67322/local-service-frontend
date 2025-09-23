import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceCard from '../services/ServiceCard';
import { Link } from 'react-router-dom';

function FeaturedServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://backend-1-1zqx.onrender.com//api/users/services');
        // Sirf pehle 3 services dikhayein
        setServices(response.data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch featured services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return null; // Agar loading ho rahi hai toh kuch na dikhayein

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/services" className="px-8 py-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 text-lg">
            View All Services
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeaturedServices;