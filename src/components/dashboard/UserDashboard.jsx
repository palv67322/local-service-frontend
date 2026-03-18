import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '../common/Button';
import AddReviewModal from '../reviews/AddReviewModal'; // Import karein

function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { token } = useContext(AuthContext);

  const fetchBookings = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get('https://local-service-backend-nqmi.onrender.com/api/bookings/my-bookings/user');
      setBookings(res.data);
    } catch (error) {
      toast.error('Failed to fetch bookings.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token]);

  const handleOpenReviewModal = (booking) => {
    setSelectedBooking(booking);
    setIsReviewModalOpen(true);
  };

  if (loading) return <div>Loading your bookings...</div>;

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">{booking.service.name}</p>
                  <p className="text-sm text-gray-600">Provider: {booking.provider.businessName}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    booking.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                  {booking.status === 'Completed' && (
                    <Button onClick={() => handleOpenReviewModal(booking)}>
                      Leave a Review
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no bookings yet.</p>
        )}
      </div>
      {selectedBooking && (
        <AddReviewModal 
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          booking={selectedBooking}
          onReviewSubmitted={fetchBookings} // Refresh bookings after review
        />
      )}
    </>
  );
}

export default UserDashboard;