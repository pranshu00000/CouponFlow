import React, { useState } from 'react';
import axios from 'axios';

const ClaimCoupon = () => {
  const [message, setMessage] = useState('');
  const [coupon, setCoupon] = useState('');

  const handleClaim = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/coupons/claim',
        {},
        { withCredentials: true }
      );
      setMessage(res.data.message);
      setCoupon(res.data.coupon);
    } catch (error) {
      setMessage(error.response?.data.message || 'Error claiming coupon');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-white to-gray-300 shadow-lg p-6 rounded-xl border border-gray-300">
  <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
    🎉 Claim Your Coupon!
  </h2>
  
  {message && (
    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center font-medium shadow-sm">
      {message} {coupon && <span className="font-bold"> - Code: {coupon}</span>}
    </div>
  )}
  
  <button
    onClick={handleClaim}
    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition-transform transform hover:bg-blue-700 hover:scale-105"
  >
    Claim Coupon 🎁
  </button>
</div>

  );
};

export default ClaimCoupon;
