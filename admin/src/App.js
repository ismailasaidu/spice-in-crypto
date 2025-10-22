import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import PrivateRoute from "./components/PrivateRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Updates from "./pages/Updates";
import NotFoundPage from "./pages/NotFoundPage";
import { auth } from "./lib/init-firebase";

const App = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#050C1F]">
        <ClipLoader size={50} color="#3B82F6" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public route */}
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <AdminLogin />}
      />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute user={user}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/update"
        element={
          <PrivateRoute user={user}>
            <Updates />
          </PrivateRoute>
        }
      />

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Catch-all for unknown routes */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
