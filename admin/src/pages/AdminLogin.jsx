import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/init-firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Logo from "../Assets/logo.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Map Firebase error codes to readable messages
  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Try again.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try later.";
      default:
        return "Login failed. Please try again.";
    }
  };

  const notify = {
    success: (msg) =>
      toast.success(msg, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        icon: <CheckCircle size={20} />,
      }),
    error: (msg) =>
      toast.error(msg, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        icon: <XCircle size={20} />,
      }),
    warning: (msg) =>
      toast.warn(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        icon: <AlertTriangle size={20} />,
      }),
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      notify.warning("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const docRef = doc(db, "admins", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        notify.success("Login successful! Redirecting...");
        navigate("/dashboard");
      } else {
        notify.error("Access denied. You are not an admin.");
      }
    } catch (error) {
      notify.error(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: "#050C1F",
        color: "#E2E8F0",
      }}
    >
      {/* Main container */}
      <div
        className="p-10 rounded-2xl w-[90%] max-w-md text-center border backdrop-blur-lg shadow-lg"
        style={{
          backgroundColor: "#050C1F",
          border: "1px solid rgba(59,130,246,0.4)",
          boxShadow: "0 0 30px rgba(37,99,235,0.3)",
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={Logo}
            alt="Logo"
            className="w-16 h-16 object-contain transition-all duration-500 hover:scale-105"
            style={{
              filter:
                "drop-shadow(0 0 12px rgba(59,130,246,0.9)) drop-shadow(0 0 25px rgba(59,130,246,0.6))",
            }}
          />
        </div>

        {/* Title */}
        <h1
          className="text-3xl font-semibold mb-8"
          style={{
            color: "#94A3B8",
            textShadow:
              "0 0 10px rgba(37,99,235,0.9), 0 0 20px rgba(59,130,246,0.6)",
          }}
        >
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded text-white placeholder-gray-400 focus:outline-none"
            style={{
              backgroundColor: "#0A122A",
              border: "1px solid rgba(59,130,246,0.3)",
              boxShadow: "0 0 10px rgba(59,130,246,0.2)",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded text-white placeholder-gray-400 focus:outline-none"
            style={{
              backgroundColor: "#0A122A",
              border: "1px solid rgba(59,130,246,0.3)",
              boxShadow: "0 0 10px rgba(59,130,246,0.2)",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded font-semibold flex items-center justify-center transition-all hover:scale-[1.03]"
            style={{
              background: "linear-gradient(90deg, #0A1B3E, #1E3A8A)",
              color: "#D1D5DB",
              boxShadow: "0 0 15px rgba(59,130,246,0.4)",
            }}
          >
            {loading ? <ClipLoader color="#60A5FA" size={20} /> : "Login"}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
