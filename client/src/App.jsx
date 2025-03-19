import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClaimCoupon from './components/ClaimCoupon';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Router>
    <div className="min-h-screen bg-gray-50 flex flex-col bg-gradient-to-br from-white to-gray-300">
      <nav className="bg-white shadow-md px-10 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">🎟️ Coupon System</h1>
        <div className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition font-medium">
            Home
          </Link>
          <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition font-medium">
            Admin
          </Link>
        </div>
      </nav>
  
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <Routes>
            <Route path="/" element={<ClaimCoupon />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminPanel />} />
          </Routes>
        </div>
      </div>
    </div>
  </Router>
  
  );
}

export default App;
