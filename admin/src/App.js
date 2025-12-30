import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import AdminRoute from "./components/AdminRoute"; // ✅ USE THIS
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Updates from "./pages/Updates";
import NotFoundPage from "./pages/NotFoundPage";
import { auth } from "./lib/init-firebase";

const App = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
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
      {/* ✅ PUBLIC ADMIN LOGIN (NO AUTO REDIRECT) */}
      <Route path="/login" element={<AdminLogin />} />

      {/* ✅ ADMIN-ONLY ROUTES */}
      <Route
        path="/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/update"
        element={
          <AdminRoute>
            <Updates />
          </AdminRoute>
        }
      />

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
