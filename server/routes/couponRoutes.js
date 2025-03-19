const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const Claim = require('../models/Claim');
const abuseCheck = require('../middleware/abuseMiddleware');
const {cooldownPeriod}=require('../middleware/abuseMiddleware')

router.post('/claim', abuseCheck, async (req, res) => {
  try {
    // Find the next available coupon (round-robin: order by _id)
    const coupon = await Coupon.findOne({ isClaimed: false, available: true }).sort({ _id: 1 });
    if (!coupon) {
      return res.status(404).json({ message: "No coupons available at the moment." });
    }
    // Mark coupon as claimed
    coupon.isClaimed = true;
    coupon.claimedAt = new Date();
    await coupon.save();

    // Create claim record with IP and user agent
    const newClaim = new Claim({
      coupon: coupon._id,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });
    await newClaim.save();

    // Set a cookie for this session (1 hour)
    res.cookie('couponClaimed', true, { maxAge: cooldownPeriod, httpOnly: true });
    res.json({ message: "Coupon claimed successfully!", coupon: coupon.code });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
