import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Updates from "./pages/Updates";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<AdminLogin />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/update"
        element={
          <PrivateRoute>
            <Updates />
          </PrivateRoute>
        }
      />

      {/* Redirect unknown routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
