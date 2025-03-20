import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [coupons, setCoupons] = useState([]);
    const [claims, setClaims] = useState([]);
    const [newCoupon, setNewCoupon] = useState('');
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [updateCode, setUpdateCode] = useState('');
    const [updateAvailable, setUpdateAvailable] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (!token) {
            navigate('/admin');
        } else {
            fetchCoupons();
            fetchClaims();
        }
    }, [token, navigate]);

    const fetchCoupons = async () => {
        try {
            const res = await axios.get('https://couponflow.onrender.com/api/admin/coupons', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCoupons(Array.isArray(res.data) ? res.data : (res.data.coupons || []));
            console.log('API response:', res.data);
            console.log('Type of response:', typeof res.data);
            console.log('Is array?', Array.isArray(res.data));
        } catch (error) {
            console.error(error);
            setCoupons([]);

        }
    };

    const fetchClaims = async () => {
        try {
            const res = await axios.get('https://couponflow.onrender.com/api/admin/claims', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setClaims(Array.isArray(res.data) ? res.data : (res.data.claims || []));
            console.log('Claims API response:', res.data);
    console.log('Type of claims response:', typeof res.data);
    console.log('Is claims array?', Array.isArray(res.data));
        } catch (error) {
            console.error(error);
            setClaims([]);

        }
    };

    const handleAddCoupon = async () => {
        try {
            await axios.post(
                'https://couponflow.onrender.com/api/admin/coupons',
                { code: newCoupon },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setNewCoupon('');
            fetchCoupons();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateCoupon = async () => {
        if (!selectedCoupon) return;
        try {
            await axios.put(
                `https://couponflow.onrender.com/api/admin/coupons/${selectedCoupon._id}`,
                { code: updateCode, available: updateAvailable },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSelectedCoupon(null);
            setUpdateCode('');
            fetchCoupons();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow p-6 rounded">
            <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Add New Coupon</h3>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newCoupon}
                        onChange={(e) => setNewCoupon(e.target.value)}
                        placeholder="Coupon Code"
                        className="border p-2 rounded w-full"
                    />
                    <button
                        onClick={handleAddCoupon}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add
                    </button>
                </div>
            </section>

            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Coupons List</h3>
                <table className="min-w-full border">
                    <thead>
                        <tr>
                            <th className="border p-2">Code</th>
                            <th className="border p-2">Claimed</th>
                            <th className="border p-2">Available</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(coupons) ? coupons.map((coupon) => (
                            <tr key={coupon._id}>
                                <td className="border p-2">{coupon.code}</td>
                                <td className="border p-2">{coupon.isClaimed ? 'Yes' : 'No'}</td>
                                <td className="border p-2">{coupon.available ? 'Yes' : 'No'}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => {
                                            setSelectedCoupon(coupon);
                                            setUpdateCode(coupon.code);
                                            setUpdateAvailable(coupon.available);
                                        }}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="4" className="border p-2 text-center">No coupons available</td></tr>}
                    </tbody>
                </table>

                {selectedCoupon && (
                    <div className="mt-4 p-4 border rounded">
                        <h4 className="font-semibold mb-2">Update Coupon</h4>
                        <div className="mb-2">
                            <label className="mr-2">Code:</label>
                            <input
                                type="text"
                                value={updateCode}
                                onChange={(e) => setUpdateCode(e.target.value)}
                                className="border p-1 rounded"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="mr-2">Available:</label>
                            <select
                                value={updateAvailable}
                                onChange={(e) => setUpdateAvailable(e.target.value === 'true')}
                                className="border p-1 rounded"
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <button
                            onClick={handleUpdateCoupon}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Update
                        </button>
                    </div>
                )}
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-2">User Claim History</h3>
                <table className="min-w-full border">
                    <thead>
                        <tr>
                            <th className="border p-2">Coupon Code</th>
                            <th className="border p-2">IP Address</th>
                            <th className="border p-2">User Agent</th>
                            <th className="border p-2">Claimed At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {claims.map((claim) => (
                            <tr key={claim._id}>
                                <td className="border p-2">{claim.coupon ? claim.coupon.code : 'N/A'}</td>
                                <td className="border p-2">{claim.ip}</td>
                                <td className="border p-2">{claim.userAgent}</td>
                                <td className="border p-2">{new Date(claim.claimedAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default AdminPanel;
