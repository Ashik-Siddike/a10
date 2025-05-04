const express = require('express');
const Campaign = require('../models/Campaign');
const auth = require('../middleware/auth');

const router = express.Router();

// Add new campaign (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { image, title, type, description, minDonation, deadline } = req.body;
    const campaign = new Campaign({
      image,
      title,
      type,
      description,
      minDonation,
      deadline,
      userEmail: req.user.email,
      userName: req.user.name
    });
    await campaign.save();
    res.status(201).json({ message: 'Campaign added successfully', campaign });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get campaign by id
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update campaign (protected, only owner)
router.put('/:id', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    if (campaign.userEmail !== req.user.email) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const { image, title, type, description, minDonation, deadline } = req.body;
    campaign.image = image;
    campaign.title = title;
    campaign.type = type;
    campaign.description = description;
    campaign.minDonation = minDonation;
    campaign.deadline = deadline;
    await campaign.save();
    res.json({ message: 'Campaign updated', campaign });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete campaign (protected, only owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    if (campaign.userEmail !== req.user.email) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await campaign.deleteOne();
    res.json({ message: 'Campaign deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get my campaigns (protected)
router.get('/user/my', auth, async (req, res) => {
  try {
    const campaigns = await Campaign.find({ userEmail: req.user.email });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 