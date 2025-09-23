import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const profilePicUrl = user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.name}&background=random&color=fff`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          LocalService<span className="text-indigo-600">Pro</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
          <Link to="/services" className="text-gray-600 hover:text-indigo-600">Services</Link>
          <Link to="/about" className="block text-gray-600" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link to="/contact" className="block text-gray-600" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>

        {/* Auth Buttons / User Info */}
        <div className="hidden md:flex items-center space-x-4">
          {token && user ? (
            // Agar user logged in hai
            <>
              <Link to="/dashboard" className="font-medium text-gray-600 hover:text-indigo-600">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Logout
              </button>
              <Link to="/dashboard">
                <img 
                  src={profilePicUrl} 
                  alt="profile" 
                  className="w-10 h-10 rounded-full object-cover"
                />
              </Link>
            </>
          ) : (
            // Agar user logged out hai
            <>
              <Link to="/login" className="px-4 py-2 text-gray-800 border border-transparent rounded-md hover:bg-gray-100">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2">
          <Link to="/" className="block text-gray-600 hover:text-indigo-600" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/services" className="block text-gray-600 hover:text-indigo-600" onClick={() => setIsOpen(false)}>Services</Link>
          <Link to="/about" className="block text-gray-600" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link to="/contact" className="block text-gray-600" onClick={() => setIsOpen(false)}>Contact</Link>
          <div className="border-t my-2"></div>
          {token && user ? (
            <>
              <Link to="/dashboard" className="block text-gray-600 hover:text-indigo-600" onClick={() => setIsOpen(false)}>Dashboard</Link>
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="block w-full text-left mt-2 px-3 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block w-full text-center px-4 py-2 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="block w-full text-center mt-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700" onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;