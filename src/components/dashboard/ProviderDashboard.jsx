import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import ServiceModal from './ServiceModal';
import ManageAvailabilityModal from './ManageAvailabilityModal';
import Button from '../common/Button';

function ProviderDashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isAvailModalOpen, setIsAvailModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const { token } = useContext(AuthContext);

  const fetchServices = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get('https://local-service-backend-nqmi.onrender.com/api/services/my-services');
      setServices(res.data);
    } catch (error) {
      toast.error('Failed to fetch services.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [token]);

  const handleSaveService = async (serviceData) => {
    const promise = editingService
      ? axios.put(`https://local-service-backend-nqmi.onrender.com/api/services/${editingService._id}`, serviceData)
      : axios.post('https://local-service-backend-nqmi.onrender.com/api/services', serviceData);

    toast.promise(promise, {
      loading: 'Saving service...',
      success: `Service ${editingService ? 'updated' : 'added'} successfully!`,
      error: `Failed to ${editingService ? 'update' : 'add'} service.`,
    });

    try {
      await promise;
      fetchServices(); // Refresh list
      setIsServiceModalOpen(false);
      setEditingService(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    const promise = axios.delete(`https://local-service-backend-nqmi.onrender.com/api/services/${serviceId}`);
    toast.promise(promise, {
      loading: 'Deleting service...',
      success: 'Service deleted successfully!',
      error: 'Failed to delete service.',
    });

    try {
      await promise;
      fetchServices(); // Refresh list
    } catch (error) {
      console.error(error);
    }
  };

  const openManageAvailModal = (service) => {
    setSelectedService(service);
    setIsAvailModalOpen(true);
  };

  if (loading) return <div>Loading your services...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Services</h2>
        <Button onClick={() => { setEditingService(null); setIsServiceModalOpen(true); }}>Add New Service</Button>
      </div>
      {services.length > 0 ? (
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">{service.name}</p>
                <p className="text-sm text-gray-600">{service.category} - ₹{service.price}</p>
              </div>
              <div className="space-x-2">
                <Button onClick={() => openManageAvailModal(service)} className="bg-green-500 hover:bg-green-600">Availability</Button>
                <Button onClick={() => { setEditingService(service); setIsServiceModalOpen(true); }} className="bg-yellow-500 hover:bg-yellow-600">Edit</Button>
                <Button onClick={() => handleDeleteService(service._id)} className="bg-red-600 hover:bg-red-700">Delete</Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p>You haven't added any services yet.</p>
          <Button onClick={() => { setEditingService(null); setIsServiceModalOpen(true); }} className="mt-4">Add Your First Service</Button>
        </div>
      )}
      <ServiceModal 
        isOpen={isServiceModalOpen} 
        onClose={() => setIsServiceModalOpen(false)} 
        onSave={handleSaveService} 
        service={editingService} 
      />
      <ManageAvailabilityModal 
        isOpen={isAvailModalOpen}
        onClose={() => setIsAvailModalOpen(false)}
        serviceId={selectedService?._id}
        serviceName={selectedService?.name}
      />
    </div>
  );
}

export default ProviderDashboard;