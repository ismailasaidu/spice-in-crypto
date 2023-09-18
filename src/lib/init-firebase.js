import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// import firebase from "firebase/compat/app"
// import 'firebase/database';

export const firebaseConfig = {


    apiKey: "AIzaSyDLEvyjCACR0BdCY7dkW2pCWyIyl0L4Z1w",
    authDomain: "spice-in-crypto.firebaseapp.com",
    projectId: "spice-in-crypto",
    storageBucket: "spice-in-crypto.appspot.com",
    messagingSenderId: "704333457690",
    appId: "1:704333457690:web:30c7352c3db8f7c38624a3",
    measurementId: "G-3JV0J7H44B"

  

};







const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
