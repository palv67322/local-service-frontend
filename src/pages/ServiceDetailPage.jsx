import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import ReviewsList from '../components/reviews/ReviewsList'; // Yeh line import hui hai

function ServiceDetailPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      setError(null);
      setService(null);

      try {
        const response = await axios.get(`import.meta.env.VITE_API_BASE_URL/api/users/services/${serviceId}`);
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

  const handleBooking = async () => {
    if (!token) {
      toast.error('Please login to book a service.');
      navigate('/login');
      return;
    }

    const toastId = toast.loading('Initiating payment...');

    try {
      const orderResponse = await axios.post('import.meta.env.VITE_API_BASE_URL/api/payments/create-order', { serviceId });
      const order = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'LocalServicePro',
        description: `Booking for ${service.name}`,
        order_id: order.id,
        handler: async function (response) {
          const verificationData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            serviceId: service._id,
            bookingDate: new Date(),
          };
          
          try {
            const verifyPromise = axios.post('import.meta.env.VITE_API_BASE_URL/api/payments/verify-payment', verificationData);
            toast.promise(verifyPromise, {
                loading: 'Verifying payment...',
                success: 'Booking confirmed successfully!',
                error: 'Payment verification failed.',
            });
            await verifyPromise;
            navigate('/dashboard');
          } catch (verifyError) {
             console.error('Verification error:', verifyError);
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: '#4f46e5',
        },
      };

      toast.dismiss(toastId);
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.response?.data?.message || 'Booking failed. Please try again.');
      console.error("Booking failed:", error);
    }
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
                onClick={handleBooking}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-gray-400"
                disabled={!token}
              >
                {token ? 'Book Now & Pay' : 'Login to Book'}
              </button>
            </div>
          </div>
        </div>
        
        {/* === YAHAN PAR BADLAV HUA HAI === */}
        {/* Instruction: Service details ke div ke theek neeche yeh ReviewsList component add karna hai. */}
        <ReviewsList serviceId={serviceId} />
        
      </div>
    </>
  );
}

export default ServiceDetailPage;