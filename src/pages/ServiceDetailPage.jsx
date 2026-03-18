import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import ReviewsList from '../components/reviews/ReviewsList';
import BookingModal from '../components/services/BookingModal';

function ServiceDetailPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      setError(null);
      setService(null);

      try {
        const response = await axios.get(`http://localhost:5000/api/users/services/${serviceId}`);
        setService(response.data);
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Could not load service details.';
        setError(errorMessage);
        console.error("Failed to fetch service details:", err);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [serviceId]);

  const handleBookingClick = () => {
    if (!token) {
      toast.error('Please login to book a service.');
      navigate('/login');
      return;
    }
    setIsBookingModalOpen(true);
  };

  if (loading) {
    return <div className="text-center py-20 text-xl font-semibold">Loading details...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-xl text-red-500">{error}</div>;
  }

  if (!service) {
    return <div className="text-center py-20 text-xl text-gray-500">Service not found.</div>;
  }
  
  const imageUrl = service.images && service.images.length > 0
    ? service.images[0]
    : `https://placehold.co/800x600/e2e8f0/4a5568?text=${service.name}`;

  return (
    <>
      <div className="container mx-auto px-6 py-12">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex">
          <img className="md:w-1/2 h-auto object-cover" src={imageUrl} alt={service.name} />
          <div className="p-8 md:w-1/2">
            <p className="text-sm text-indigo-600 font-semibold">{service.category}</p>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">{service.name}</h1>
            <p className="text-md text-gray-600 mt-2">by <span className="font-semibold">{service.provider?.businessName}</span></p>
            <p className="text-gray-700 mt-4">{service.description}</p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-gray-900">₹{service.price}</span>
              <span className="text-sm text-gray-600">/{service.priceType}</span>
            </div>
            <div className="mt-8">
              <button 
                onClick={handleBookingClick}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
              >
                Book Now & Pay
              </button>
            </div>
          </div>
        </div>
        <ReviewsList serviceId={serviceId} />
      </div>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        service={service}
      />
    </>
  );
}

export default ServiceDetailPage;