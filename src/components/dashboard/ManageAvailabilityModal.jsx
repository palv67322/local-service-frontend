import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Input from '../common/Input';
import Button from '../common/Button';
import { FaTrash } from 'react-icons/fa';

function ManageAvailabilityModal({ isOpen, onClose, serviceId, serviceName }) {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [timeSlots, setTimeSlots] = useState(''); // Comma-separated times for adding

  const fetchAvailability = async () => {
    if (!serviceId) return;
    try {
      setLoading(true);
      const res = await axios.get(`https://local-service-backend-nqmi.onrender.com/api/services/${serviceId}/availability`);
      // Sort dates
      const sortedAvailability = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setAvailability(sortedAvailability);
    } catch (error) {
      toast.error('Failed to load availability.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAvailability();
    }
  }, [isOpen, serviceId]);

  const handleAddSlots = async (e) => {
    e.preventDefault();
    const slotsArray = timeSlots.split(',').map(s => s.trim()).filter(s => s);
    if (!date || slotsArray.length === 0) {
      return toast.error('Please select a date and add time slots.');
    }
    const promise = axios.post(`https://local-service-backend-nqmi.onrender.com/api/services/${serviceId}/availability`, { date, timeSlots: slotsArray });
    toast.promise(promise, { loading: 'Adding slots...', success: 'Availability updated!', error: 'Failed to add.' });
    try { await promise; setTimeSlots(''); fetchAvailability(); } catch (error) { console.error(error); }
  };
  
  const handleDeleteSlot = async (dateId, slotId) => {
      if(!window.confirm('Are you sure you want to delete this time slot?')) return;
      const promise = axios.delete(`https://local-service-backend-nqmi.onrender.com/api/services/${serviceId}/availability/${dateId}/slots/${slotId}`);
      toast.promise(promise, { loading: 'Deleting slot...', success: 'Slot deleted!', error: (err) => err.response?.data?.message || 'Failed to delete.' });
      try { await promise; fetchAvailability(); } catch (error) { console.error(error); }
  };
  
  const handleDeleteDate = async (dateId) => {
      if(!window.confirm('Are you sure you want to delete all slots for this date?')) return;
      const promise = axios.delete(`https://local-service-backend-nqmi.onrender.com/api/services/${serviceId}/availability/${dateId}`);
      toast.promise(promise, { loading: 'Deleting date...', success: 'Date deleted!', error: (err) => err.response?.data?.message || 'Failed to delete.' });
      try { await promise; fetchAvailability(); } catch (error) { console.error(error); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Manage Availability for <span className="text-indigo-600">{serviceName}</span></h2>
        
        {/* Add Availability Form */}
        <form onSubmit={handleAddSlots} className="flex flex-col md:flex-row gap-4 mb-6 pb-6 border-b">
          <Input label="Select Date" name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Input label="Add Time Slots (comma-separated)" name="timeSlots" value={timeSlots} onChange={(e) => setTimeSlots(e.target.value)} placeholder="09:00, 10:00" />
          <div className="self-end"><Button type="submit">Add Slots</Button></div>
        </form>

        {/* Existing Availability List */}
        <h3 className="text-xl font-semibold mb-4">Current Schedule</h3>
        <div className="flex-grow overflow-y-auto pr-2">
          {loading ? <p>Loading...</p> : availability.length > 0 ? (
            <div className="space-y-4">
              {availability.map(avail => (
                <div key={avail._id} className="bg-gray-50 p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold">{new Date(avail.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <button onClick={() => handleDeleteDate(avail._id)} className="text-red-500 hover:text-red-700" title="Delete entire date"><FaTrash /></button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {avail.slots.map(slot => (
                      <div key={slot._id} className={`flex items-center px-3 py-1 rounded text-sm ${slot.isBooked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {slot.time}
                        {!slot.isBooked && (
                           <button onClick={() => handleDeleteSlot(avail._id, slot._id)} className="ml-2 text-red-500 hover:text-red-700" title="Delete slot"><FaTrash size={12} /></button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : <p>No availability added yet.</p>}
        </div>

        <div className="flex justify-end mt-6 pt-6 border-t">
          <Button type="button" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}

export default ManageAvailabilityModal;