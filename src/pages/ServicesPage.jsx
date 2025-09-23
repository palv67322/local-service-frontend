import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ServiceCard from '../components/services/ServiceCard';
import toast from 'react-hot-toast';

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get('import.meta.env.VITE_API_BASE_URL/api/users/services');
        setServices(response.data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        toast.error('Could not load services.');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Filter logic
  const filteredServices = useMemo(() => {
    const searchTerm = searchParams.get('search')?.toLowerCase() || '';
    const categoryTerm = searchParams.get('category')?.toLowerCase() || '';

    if (!searchTerm && !categoryTerm) {
      return services;
    }

    return services.filter(service => {
      const matchesSearch = searchTerm ? 
        service.name.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm) ||
        service.category.toLowerCase().includes(searchTerm) : true;
      
      const matchesCategory = categoryTerm ? 
        service.category.toLowerCase() === categoryTerm : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchParams, services]);

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading services...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Explore Our Services
        </h1>
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl py-10">
            No services found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
}

export default ServicesPage;