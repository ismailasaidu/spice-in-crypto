import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Assets/logo.png";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-[#050C1F] text-white">
      {/* Logo */}
      <img
        src={Logo}
        alt="Logo"
        className="w-24 h-24 mb-6 object-contain animate-pulse drop-shadow-[0_0_20px_#3B82F6]"
      />

      {/* 404 Heading */}
      <h1 className="text-7xl font-bold mb-4 text-blue-500 drop-shadow-lg">
        404
      </h1>
      <p className="text-2xl mb-6 text-gray-300">
        Oops! The page you are looking for does not exist.
      </p>

      {/* Return Home Button */}
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition shadow-lg"
      >
        Go to Admin Login
      </button>

      {/* Optional subtle animated stars for style */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="animate-pulse absolute w-1 h-1 bg-white rounded-full top-10 left-20"></div>
        <div className="animate-pulse absolute w-1 h-1 bg-white rounded-full top-32 left-80"></div>
        <div className="animate-pulse absolute w-1 h-1 bg-white rounded-full top-64 left-40"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
