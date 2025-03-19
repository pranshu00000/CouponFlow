const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon', required: true },
  ip: { type: String, required: true },
  userAgent: { type: String },
  claimedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Claim', claimSchema);
