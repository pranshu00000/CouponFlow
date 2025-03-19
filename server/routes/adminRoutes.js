const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Coupon = require('../models/Coupon');
const Claim = require('../models/Claim');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const adminAuth = require('../middleware/authMiddleware');

// Admin login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all coupons
router.get('/coupons', adminAuth, async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add new coupon
router.post('/coupons', adminAuth, async (req, res) => {
  const { code } = req.body;
  try {
    const newCoupon = new Coupon({ code });
    await newCoupon.save();
    res.json({ message: "Coupon added successfully", coupon: newCoupon });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update coupon (e.g. update code or toggle availability)
router.put('/coupons/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  const { code, available } = req.body;
  try {
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    if (code) coupon.code = code;
    if (available !== undefined) coupon.available = available;
    await coupon.save();
    res.json({ message: "Coupon updated", coupon });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get user claim history
router.get('/claims', adminAuth, async (req, res) => {
  try {
    const claims = await Claim.find().populate('coupon');
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
