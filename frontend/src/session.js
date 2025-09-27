import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./init-firebase";
import { v4 as uuidv4 } from "uuid";

export const createSession = async (user) => {
  const sessionId = uuidv4();

  // Save to Firestore
  await setDoc(doc(db, "sessions", user.uid), {
    sessionId,
    createdAt: new Date(),
  });

  // Save to localStorage
  localStorage.setItem("sessionId", sessionId);
};

export const validateSession = (user) => {
  const sessionRef = doc(db, "sessions", user.uid);

  onSnapshot(sessionRef, (docSnap) => {
    if (docSnap.exists()) {
      const firestoreSessionId = docSnap.data().sessionId;
      const localSessionId = localStorage.getItem("sessionId");

      if (firestoreSessionId !== localSessionId) {
        // ❌ Another device logged in → log out this one
        auth.signOut();
        localStorage.removeItem("sessionId");
        alert(
          "You were logged out because your account was used on another device."
        );
      }
    }
  });
};

export const clearSession = async (user) => {
  if (!user) return;
  await setDoc(doc(db, "sessions", user.uid), { sessionId: null });
  localStorage.removeItem("sessionId");
};
