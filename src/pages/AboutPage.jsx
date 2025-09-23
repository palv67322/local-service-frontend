import React from 'react';

function AboutPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About LocalServicePro</h1>
        <div className="text-gray-600 text-lg space-y-6">
          <p>
            Welcome to LocalServicePro, your one-stop destination for finding reliable and skilled local service professionals. Our mission is to bridge the gap between skilled workers and the customers who need them, making life easier for everyone.
          </p>
          <p>
            Founded in 2025, we noticed how difficult it was for people to find trustworthy electricians, plumbers, painters, and other home service experts. On the other hand, many talented professionals struggled to reach a wider audience. We created LocalServicePro to solve this very problem with a simple, secure, and efficient platform.
          </p>
          <h2 className="text-3xl font-bold text-gray-800 pt-8">Our Vision</h2>
          <p>
            We envision a world where finding and booking a local service is as easy as ordering food online. We are committed to empowering local economies by providing a platform for professionals to grow their businesses and for customers to receive top-notch service with confidence.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;