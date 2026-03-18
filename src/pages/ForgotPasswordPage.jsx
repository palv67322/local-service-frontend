import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const promise = axios.post('https://local-service-backend-nqmi.onrender.com/api/auth/forgot-password', { email });

    toast.promise(promise, {
      loading: 'Sending reset link...',
      success: 'If an account exists, a reset link has been sent to your email.',
      error: 'An error occurred. Please try again.',
    });

    try {
        await promise;
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot Your Password?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          No worries! Enter your email and we'll send you a reset link.
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <Button fullWidth={true} type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </div>
          </form>
           <div className="mt-6 text-center">
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;