import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { storage } from '../../firebaseConfig'; // Firebase storage import karein
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';

function ServiceModal({ isOpen, onClose, onSave, service }) {
  const [formData, setFormData] = useState({ name: '', description: '', category: '', price: '', priceType: 'fixed', images: [] });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || '',
        description: service.description || '',
        category: service.category || '',
        price: service.price || '',
        priceType: service.priceType || 'fixed',
        images: service.images || [],
      });
    } else {
      setFormData({ name: '', description: '', category: '', price: '', priceType: 'fixed', images: [] });
    }
    setImageFile(null); // Reset file input
  }, [service, isOpen]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const handleUploadAndSave = async (e) => {
    e.preventDefault();
    if (imageFile) {
      setUploading(true);
      const toastId = toast.loading('Uploading image...');
      const storageRef = ref(storage, `services/${Date.now()}_${imageFile.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, imageFile);
        const downloadURL = await getDownloadURL(snapshot.ref);
        toast.success('Image uploaded!', { id: toastId });
        // Save service with the new image URL
        onSave({ ...formData, images: [downloadURL, ...formData.images] });
      } catch (error) {
        toast.error('Image upload failed.', { id: toastId });
        console.error("Firebase upload error:", error);
      } finally {
        setUploading(false);
      }
    } else {
      // Save service without uploading a new image
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">{service ? 'Edit Service' : 'Add New Service'}</h2>
        <form onSubmit={handleUploadAndSave} className="space-y-4">
          <Input label="Service Name" name="name" value={formData.name} onChange={handleChange} />
          <Input label="Description" name="description" value={formData.description} onChange={handleChange} />
          <Input label="Category" name="category" value={formData.category} onChange={handleChange} />
          <Input label="Price" name="price" type="number" value={formData.price} onChange={handleChange} />
          <div>
            <label className="block text-sm font-medium text-gray-700">Service Image</label>
            <input type="file" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <Button type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={uploading}>{uploading ? 'Uploading…' : 'Save Service'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ServiceModal;