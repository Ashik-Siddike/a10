const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true }, // personal issue, startup, business, creative ideas
  description: { type: String, required: true },
  minDonation: { type: Number, required: true },
  deadline: { type: Date, required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema); 