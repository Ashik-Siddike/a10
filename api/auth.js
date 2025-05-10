const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../sarvar/models/User');

module.exports = async (req, res) => {
  if (req.method === 'POST' && req.url === '/register') {
    try {
      const { name, email, password, photoURL } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, photoURL });
      await user.save();
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Server error' });
    }
  }
  if (req.method === 'POST' && req.url === '/login') {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user._id, email: user.email, name: user.name, photoURL: user.photoURL }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: { id: user._id, name: user.name, email: user.email, photoURL: user.photoURL } });
    } catch (err) {
      return res.status(500).json({ message: 'Server error' });
    }
  }
  return res.status(404).json({ message: 'Not found' });
}; 