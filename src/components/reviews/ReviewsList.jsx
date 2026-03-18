import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating';

function ReviewsList({ serviceId }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!serviceId) return;
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`https://local-service-backend-nqmi.onrender.com/api/reviews/${serviceId}`);
                setReviews(res.data);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [serviceId]);

    if (loading) return <p>Loading reviews...</p>;

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
            {reviews.length > 0 ? (
                <div className="space-y-6">
                    {reviews.map(review => (
                        <div key={review._id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                                <img src={review.user.profilePicture || `https://ui-avatars.com/api/?name=${review.user.name}`} alt={review.user.name} className="w-10 h-10 rounded-full mr-4" />
                                <div>
                                    <p className="font-semibold">{review.user.name}</p>
                                    <StarRating rating={review.rating} />
                                </div>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reviews yet for this service.</p>
            )}
        </div>
    );
}

export default ReviewsList;