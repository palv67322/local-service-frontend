import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

function BookingModal({ isOpen, onClose, service }) {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    if (service && isOpen) {
      // Fetch availability jab modal khule
      const fetchAvailability = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/services/${service._id}/availability`);
          setAvailability(res.data);
        } catch (error) {
          toast.error('Failed to load availability.');
        }
      };
      fetchAvailability();
    }
  }, [service, isOpen]);

  useEffect(() => {
    // Jab date select ho, toh uske slots dikhayein
    if (selectedDate) {
      const dateData = availability.find(d => new Date(d.date).toDateString() === new Date(selectedDate).toDateString());
      setAvailableSlots(dateData ? dateData.slots : []);
      setSelectedSlot('');
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate, availability]);

  const handleBooking = async () => {
    if (!selectedDate || !selectedSlot) {
      return toast.error('Please select a date and time slot.');
    }

    const toastId = toast.loading('Initiating payment...');

    try {
      const orderResponse = await axios.post('http://localhost:5000/api/payments/create-order', { serviceId: service._id });
      const order = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        name: 'LocalServicePro',
        description: `Booking for ${service.name}`,
        order_id: order.id,
        handler: async (response) => {
          const verificationData = {
            ...response,
            serviceId: service._id,
            bookingDate: selectedDate,
            bookingTime: selectedSlot,
          };
          
          const verifyPromise = axios.post('http://localhost:5000/api/payments/verify-payment', verificationData);
          toast.promise(verifyPromise, {
              loading: 'Verifying payment...',
              success: 'Booking confirmed successfully!',
              error: (err) => err.response?.data?.message || 'Booking failed.',
          });
          await verifyPromise;
          navigate('/dashboard');
        },
        prefill: { name: user?.name, email: user?.email },
        theme: { color: '#4f46e5' },
      };
      toast.dismiss(toastId);
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Booking failed. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Book Service</h2>
        <h3 className="text-xl text-indigo-600 mb-6">{service.name}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Date</label>
            <select onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="">-- Select a Date --</option>
              {availability.map(avail => (
                <option key={avail._id} value={avail.date}>
                  {new Date(avail.date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          {availableSlots.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Time Slot</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableSlots.map(slot => (
                  <button
                    key={slot._id}
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`px-4 py-2 rounded-md ${selectedSlot === slot.time ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Button type="button" onClick={onClose}>Cancel</Button>
          <Button onClick={handleBooking}>Book & Pay (₹{service.price})</Button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;