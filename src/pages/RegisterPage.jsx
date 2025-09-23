import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';

function RegisterPage() {
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
    phone: '',
    address: '',
    specialization: '',
    experience: ''
  });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.name === 'experience' ? Number(e.target.value) : e.target.value });
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      return toast.error("Please enter your email first.");
    }
    try {
      const promise = axios.post('https://backend-1-1zqx.onrender.com//api/auth/send-otp', { email: formData.email });
      toast.promise(promise, {
        loading: 'Sending OTP...',
        success: 'OTP sent successfully!',
        error: (err) => err.response?.data?.message || 'Failed to send OTP.',
      });
      await promise;
      setOtpSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpSent) return toast.error("Please send OTP first.");

    const registrationData = {
      ...formData,
      role,
      otp,
      specialization: role === 'provider' ? formData.specialization.split(',').map(s => s.trim()) : undefined
    };

    if (role === 'user') {
      delete registrationData.businessName;
      delete registrationData.phone;
      delete registrationData.address;
      delete registrationData.specialization;
      delete registrationData.experience;
    }

    try {
        const promise = axios.post('https://backend-1-1zqx.onrender.com//api/auth/register', registrationData);
        
        toast.promise(promise, {
            loading: 'Creating your account...',
            success: 'Registration successful! Logging you in...',
            error: (err) => err.response?.data?.message || 'Registration failed.',
        });
        
        await promise;
        
        // Registration successful, now log the user in
        await login(formData.email, formData.password);
        
        navigate('/'); // Redirect to homepage
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-center space-x-4">
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="role" value="user" checked={role === 'user'} onChange={() => setRole('user')} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-700">I am a User</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="role" value="provider" checked={role === 'provider'} onChange={() => setRole('provider')} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-700">I am a Provider</span>
              </label>
            </div>
            <hr/>
            <Input label="Full Name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} />
            <Input label="Email address" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
            <Input label="Password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
            {role === 'provider' && (
              <>
                <Input label="Business Name" name="businessName" placeholder="e.g., John's Plumbing" value={formData.businessName} onChange={handleChange} />
                <Input label="Phone Number" name="phone" type="tel" placeholder="9876543210" value={formData.phone} onChange={handleChange} />
                <Input label="Address" name="address" placeholder="123 Main St, City" value={formData.address} onChange={handleChange} />
                <Input label="Specialization (comma-separated)" name="specialization" placeholder="Plumbing, Electrical" value={formData.specialization} onChange={handleChange} />
                <Input label="Experience (in years)" name="experience" type="number" placeholder="5" value={formData.experience} onChange={handleChange} />
              </>
            )}
            {otpSent && (
              <Input label="Enter OTP" name="otp" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} />
            )}
            {!otpSent ? (
              <div>
                <Button type="button" fullWidth={true} onClick={handleSendOtp}>
                  Send OTP
                </Button>
              </div>
            ) : (
              <div>
                <Button type="submit" fullWidth={true}>Create Account</Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;