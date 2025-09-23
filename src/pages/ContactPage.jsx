import React, { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import axios from 'axios';
import toast from 'react-hot-toast';

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const promise = axios.post('https://backend-1-1zqx.onrender.com//api/contact', formData);
    
    toast.promise(promise, {
        loading: 'Sending message...',
        success: 'Message sent successfully!',
        error: (err) => err.response?.data?.message || 'Failed to send message.',
    });

    try {
        await promise;
        setFormData({ name: '', email: '', message: '' }); // Form reset karein
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Your Name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} />
            <Input label="Your Email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
              <textarea id="message" name="message" rows="5" placeholder="How can we help you?" value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required></textarea>
            </div>
            <Button fullWidth={true} type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
        <div className="text-gray-600">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
          <p className="mb-4">
            Have a question or need assistance? We'd love to hear from you. Reach out to us through any of the methods below.
          </p>
          <div className="space-y-4">
            <p><strong>Address:</strong> 123 Service Lane, Mumbai, Maharashtra, India</p>
            <p><strong>Email:</strong> support@localservicepro.com</p>
            <p><strong>Phone:</strong> +91 12345 67890</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;