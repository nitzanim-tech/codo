const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.database();
const usersRef = db.ref('users');

const getInsts = functions.https.onCall(async (data, context) => {
  try {
    const snapshot = await usersRef.once('value');
    const allUsers = snapshot.val() || {};
    const nitzanimUsers = Object.entries(allUsers)
      .map(([userId, user]) => ({
        id: userId,
        ...user,
      }))
      .filter((user) => user.email && user.email.endsWith('@nitzanim.tech'));
    return nitzanimUsers;
  } catch (error) {
    console.error('Error getting data:', error);
    throw new functions.https.HttpsError('unknown', 'Error getting data:', error);
  }
});

module.exports = { getInsts };
