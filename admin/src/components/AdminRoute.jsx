import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../lib/init-firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/init-firebase";
import ClipLoader from "react-spinners/ClipLoader";

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;

      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const ref = doc(db, "admins", user.uid);
      const snap = await getDoc(ref);

      setIsAdmin(snap.exists());
      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#050C1F]">
        <ClipLoader size={40} color="#3B82F6" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
