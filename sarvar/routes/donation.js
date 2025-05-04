const express = require('express');
const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');
const auth = require('../middleware/auth');

const router = express.Router();

// Add donation (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { campaignId, amount } = req.body;
    if (!campaignId || !amount) {
      return res.status(400).json({ message: 'Campaign and amount required' });
    }
    // Check if campaign exists and deadline not passed
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    if (new Date(campaign.deadline) < new Date()) {
      return res.status(400).json({ message: 'Campaign deadline is over' });
    }
    const donation = new Donation({
      campaignId,
      userEmail: req.user.email,
      userName: req.user.name,
      amount
    });
    await donation.save();
    res.status(201).json({ message: 'Donation successful', donation });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get my donations (protected)
router.get('/my', auth, async (req, res) => {
  try {
    const donations = await Donation.find({ userEmail: req.user.email }).populate('campaignId');
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 