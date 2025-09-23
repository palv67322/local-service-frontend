import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return toast.error('Please enter both email and password.');
    }
    try {
      const promise = login(formData.email, formData.password);
      
      toast.promise(promise, {
        loading: 'Logging in...',
        success: 'Logged in successfully!',
        error: (err) => err.response?.data?.message || 'Login failed. Please check your credentials.',
      });
      
      await promise;
      navigate('/'); // Redirect to homepage
    } catch (error) {
      // The toast will show the error, so we just log it here
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button fullWidth={true}>Sign in</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;