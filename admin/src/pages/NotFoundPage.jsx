import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Assets/logo.png";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center bg-[#050C1F] text-white">
      {/* Logo */}
      <img
        src={Logo}
        alt="Logo"
        className="w-24 h-24 sm:w-28 sm:h-28 mb-6 object-contain animate-pulse drop-shadow-[0_0_20px_#3B82F6]"
      />

      {/* 404 Heading */}
      <h1 className="text-6xl sm:text-7xl font-bold mb-4 text-blue-500 drop-shadow-lg">
        404
      </h1>
      <p className="text-lg sm:text-2xl mb-6 text-gray-300 max-w-md">
        Oops! The page you are looking for does not exist.
      </p>

      {/* Return Home Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition shadow-lg"
      >
        Go to Admin Dashboard
      </button>

      {/* Optional subtle animated stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="animate-pulse absolute w-1 h-1 bg-white rounded-full top-10 left-20 sm:top-16 sm:left-32"></div>
        <div className="animate-pulse absolute w-1 h-1 bg-white rounded-full top-32 left-80 sm:top-40 sm:left-96"></div>
        <div className="animate-pulse absolute w-1 h-1 bg-white rounded-full top-64 left-40 sm:top-72 sm:left-56"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
