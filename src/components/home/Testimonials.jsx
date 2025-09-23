import React from 'react';

function Testimonials() {
  const testimonials = [
    { name: 'Priya S.', quote: 'Found an amazing electrician within minutes! The service was professional and quick. Highly recommended.', city: 'Mumbai' },
    { name: 'Rahul K.', quote: 'The booking process was so simple and secure. I got my AC repaired the same day. Great platform!', city: 'Delhi' },
    { name: 'Anjali M.', quote: 'I use this for all my home cleaning needs. The providers are always verified and trustworthy.', city: 'Bangalore' },
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-gray-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <p className="font-bold text-gray-800">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.city}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;