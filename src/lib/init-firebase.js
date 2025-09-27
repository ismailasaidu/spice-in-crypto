import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// import firebase from "firebase/compat/app"
// import 'firebase/database';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN_KEY,
  projectId: process.env.REACT_APP_PROJECTID_KEY,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_KEY,
  messagingSenderId: process.env.REACT_APP_MESSENGER_ID_KEY,
  appId: process.env.REACT_APP_APP_ID_KEY,
  measurementId: process.env.REACT_APP_MEASUREMNT_ID_KEY,
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
