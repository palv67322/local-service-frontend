import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Button from '../common/Button';

function AddReviewModal({ isOpen, onClose, booking, onReviewSubmitted }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === '') {
        return toast.error('Please write a comment.');
    }
    
    const promise = axios.post(`http://localhost:5000/api/reviews/${booking._id}`, { rating, comment });
    
    toast.promise(promise, {
        loading: 'Submitting your review...',
        success: 'Thank you for your review!',
        error: (err) => err.response?.data?.message || 'Failed to submit review.',
    });
    
    try {
        await promise;
        onReviewSubmitted(); // Refresh the booking list
        onClose();
    } catch (error) {
        console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Leave a Review for</h2>
        <p className="text-lg text-indigo-600 mb-6">{booking.service.name}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Rating</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Very Good</option>
              <option value={3}>3 - Good</option>
              <option value={2}>2 - Fair</option>
              <option value={1}>1 - Poor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Comment</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows="4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Share your experience..."></textarea>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit">Submit Review</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReviewModal;