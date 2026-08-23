import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      if (res.data) {
        const userData = res.data.user || res.data;
        localStorage.setItem('user', JSON.stringify(userData));
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
        }
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Login to HR Recruitment Portal</p>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium">Sign In</button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <Link to="/register" className="text-blue-600 font-medium hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;