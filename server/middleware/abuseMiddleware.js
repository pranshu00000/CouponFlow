const Claim = require('../models/Claim');

const cooldownPeriod = 60 * 60 * 1000; // 1 hour in ms

const abuseCheck = async (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  try {
    const recentClaim = await Claim.findOne({ ip }).sort({ claimedAt: -1 });
    if (recentClaim && (now - recentClaim.claimedAt.getTime()) < cooldownPeriod) {
      return res.status(429).json({
        message: "You have already claimed a coupon recently. Please try again later.",
      });
    }
    if (req.cookies && req.cookies.couponClaimed) {
      return res.status(429).json({
        message: "This browser has already claimed a coupon. Please try again later.",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = abuseCheck;
