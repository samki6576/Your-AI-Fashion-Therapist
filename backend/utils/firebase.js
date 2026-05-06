import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const {
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY
} = process.env;

let db;

try {
  if (FIREBASE_PROJECT_ID && 
      FIREBASE_CLIENT_EMAIL && 
      FIREBASE_PRIVATE_KEY && 
      FIREBASE_PRIVATE_KEY.includes('BEGIN PRIVATE KEY') &&
      !FIREBASE_PRIVATE_KEY.includes('your-private-key') &&
      FIREBASE_PROJECT_ID !== 'your-project-id') {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: FIREBASE_PROJECT_ID,
          clientEmail: FIREBASE_CLIENT_EMAIL,
          privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
    }
    db = admin.firestore();
    console.log('[Firebase] Admin SDK initialized successfully');
  } else {
    console.log('[Firebase] Demo mode: Firebase credentials not fully configured. Using in-memory fallback.');
    db = null;
  }
} catch (error) {
  console.error('[Firebase] Initialization error:', error.message);
  db = null;
}

export { db };
