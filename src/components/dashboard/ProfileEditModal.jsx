import React, { useState, useEffect, useContext } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';

function ProfileEditModal({ isOpen, onClose }) {
  const { user, provider, updateUserContext } = useContext(AuthContext);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        businessName: provider?.businessName || '',
        phone: provider?.phone || '',
        address: provider?.address || '',
      });
    }
  }, [user, provider, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promise = axios.put('https://backend-1-1zqx.onrender.com//api/auth/update', formData);
    toast.promise(promise, {
      loading: 'Updating profile...',
      success: 'Profile updated successfully!',
      error: 'Failed to update profile.',
    });
    try {
      const res = await promise;
      updateUserContext(res.data); // Update context with new data
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
          {user.role === 'provider' && (
            <>
              <Input label="Business Name" name="businessName" value={formData.businessName} onChange={handleChange} />
              <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
              <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
            </>
          )}
          <div className="flex justify-end space-x-4 mt-6">
            <Button type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileEditModal;