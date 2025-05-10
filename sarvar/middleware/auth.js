const admin = require('../firebaseAdmin');

async function verifyAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token, authorization denied');
  }
  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return {
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email,
      uid: decodedToken.uid,
      photoURL: decodedToken.picture || null,
    };
  } catch (err) {
    throw new Error('Token is not valid');
  }
}

module.exports = verifyAuth;