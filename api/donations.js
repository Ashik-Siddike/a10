const Donation = require('../sarvar/models/Donation');
const Campaign = require('../sarvar/models/Campaign');
const verifyAuth = require('../sarvar/middleware/auth');

module.exports = async (req, res) => {
  // Add donation (protected)
  if (req.method === 'POST') {
    try {
      const user = await verifyAuth(req);
      const { campaignId, amount } = req.body;
      if (!campaignId || !amount) {
        return res.status(400).json({ message: 'Campaign and amount required' });
      }
      const campaign = await Campaign.findById(campaignId);
      if (!campaign) {
        return res.status(404).json({ message: 'Campaign not found' });
      }
      if (new Date(campaign.deadline) < new Date()) {
        return res.status(400).json({ message: 'Campaign deadline is over' });
      }
      const donation = new Donation({
        campaignId,
        userEmail: user.email,
        userName: user.name,
        amount
      });
      await donation.save();
      return res.status(201).json({ message: 'Donation successful', donation });
    } catch (err) {
      return res.status(401).json({ message: err.message || 'Unauthorized or server error' });
    }
  }

  // Get my donations (protected)
  if (req.method === 'GET' && req.query.my === '1') {
    try {
      const user = await verifyAuth(req);
      const donations = await Donation.find({ userEmail: user.email }).populate('campaignId');
      return res.json(donations);
    } catch (err) {
      return res.status(401).json({ message: err.message || 'Unauthorized or server error' });
    }
  }

  return res.status(404).json({ message: 'Not found' });
}; 