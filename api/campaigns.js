const Campaign = require('../sarvar/models/Campaign');
const verifyAuth = require('../sarvar/middleware/auth');

module.exports = async (req, res) => {
  // Add new campaign (protected)
  if (req.method === 'POST') {
    try {
      const user = await verifyAuth(req);
      const { image, title, type, description, minDonation, deadline } = req.body;
      const campaign = new Campaign({
        image,
        title,
        type,
        description,
        minDonation,
        deadline,
        userEmail: user.email,
        userName: user.name
      });
      await campaign.save();
      return res.status(201).json({ message: 'Campaign added successfully', campaign });
    } catch (err) {
      return res.status(401).json({ message: err.message || 'Unauthorized or server error' });
    }
  }

  // Get all campaigns
  if (req.method === 'GET' && !req.query.id && !req.query.user) {
    try {
      const campaigns = await Campaign.find();
      return res.json(campaigns);
    } catch (err) {
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // Get campaign by id
  if (req.method === 'GET' && req.query.id) {
    try {
      const campaign = await Campaign.findById(req.query.id);
      if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
      return res.json(campaign);
    } catch (err) {
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // Update campaign (protected, only owner)
  if (req.method === 'PUT' && req.query.id) {
    try {
      const user = await verifyAuth(req);
      const campaign = await Campaign.findById(req.query.id);
      if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
      if (campaign.userEmail !== user.email) {
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
      return res.json({ message: 'Campaign updated', campaign });
    } catch (err) {
      return res.status(401).json({ message: err.message || 'Unauthorized or server error' });
    }
  }

  // Delete campaign (protected, only owner)
  if (req.method === 'DELETE' && req.query.id) {
    try {
      const user = await verifyAuth(req);
      const campaign = await Campaign.findById(req.query.id);
      if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
      if (campaign.userEmail !== user.email) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      await campaign.deleteOne();
      return res.json({ message: 'Campaign deleted' });
    } catch (err) {
      return res.status(401).json({ message: err.message || 'Unauthorized or server error' });
    }
  }

  // Get my campaigns (protected)
  if (req.method === 'GET' && req.query.user === 'my') {
    try {
      const user = await verifyAuth(req);
      const campaigns = await Campaign.find({ userEmail: user.email });
      return res.json(campaigns);
    } catch (err) {
      return res.status(401).json({ message: err.message || 'Unauthorized or server error' });
    }
  }

  return res.status(404).json({ message: 'Not found' });
}; 