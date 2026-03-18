import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

function ProviderBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const fetchProviderBookings = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get('https://local-service-backend-nqmi.onrender.com/api/bookings/my-bookings/provider');
      setBookings(res.data);
    } catch (error) {
      toast.error('Failed to fetch bookings.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviderBookings();
  }, [token]);

  const handleStatusChange = async (bookingId, newStatus) => {
    const promise = axios.put(`https://local-service-backend-nqmi.onrender.com/api/bookings/${bookingId}/status`, { status: newStatus });
    toast.promise(promise, {
        loading: 'Updating status...',
        success: 'Status updated successfully!',
        error: 'Failed to update status.'
    });

    try {
        await promise;
        fetchProviderBookings(); // Refresh the list
    } catch (error) {
        console.error(error);
    }
  };

  if (loading) return <div>Loading bookings...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Incoming Bookings</h2>
      {bookings.length > 0 ? (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.service.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select 
                        value={booking.status} 
                        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>You have no bookings yet.</p>
      )}
    </div>
  );
}

export default ProviderBookings;