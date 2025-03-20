import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://couponflow.onrender.com/api/admin/login', { username, password });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-xl border border-gray-200">
  <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">🔑 Admin Login</h2>

  {error && (
    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center font-medium shadow-sm border border-red-300">
      {error}
    </div>
  )}

  <form onSubmit={handleLogin} className="space-y-4">
    <div>
      <label className="block text-gray-700 font-medium mb-1">Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
        required
      />
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-1">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
        required
      />
    </div>

    <button
      type="submit"
      className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg shadow-md transition-transform transform hover:bg-green-600 hover:scale-105"
    >
      Login 🚀
    </button>
  </form>
</div>

  );
};

export default AdminLogin;
