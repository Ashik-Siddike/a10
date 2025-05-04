const admin = require('../firebaseAdmin');

async function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = {
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email,
      uid: decodedToken.uid,
      photoURL: decodedToken.picture || null,
    };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = auth;