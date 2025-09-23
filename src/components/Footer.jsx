import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="text-2xl font-bold">LocalServicePro</Link>
          <p className="mt-2 text-gray-400">Find the best local services, right at your doorstep.</p>
          <div className="mt-4 flex space-x-4">
            <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
            <Link to="/services" className="text-gray-400 hover:text-white">Services</Link>
            <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
            {/* Hum Privacy Policy page bhi bana sakte hain */}
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
          </div>
        </div>
        <hr className="my-6 border-gray-700" />
        <p className="text-center text-gray-400">
          © {new Date().getFullYear()} LocalServicePro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;