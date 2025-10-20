import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0f1c] via-[#0d1a2f] to-[#10294a] px-4 pt-[50px] text-white">
      {/* glowing light blue orbs */}
      <div className="absolute top-[-80px] left-[-100px] w-[400px] h-[400px] bg-[#00BFFF]/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-80px] w-[300px] h-[300px] bg-[#0099FF]/15 blur-[100px] rounded-full"></div>

      {/* floating rocket */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="flex justify-center items-center w-32 h-32 rounded-full mt-[20px] sm:mt-[-65px] mb-6 shadow-[0_0_25px_rgba(0,191,255,0.4)] border-4 border-[#00BFFF] bg-white/10 backdrop-blur-md"
      >
        <FaRocket className="text-5xl text-[#00BFFF]" />
      </motion.div>

      {/* 404 text */}
      <h1 className="text-[120px] sm:text-[80px] font-extrabold tracking-tight text-[#00BFFF] drop-shadow-[0_0_20px_rgba(0,191,255,0.4)]">
        404
      </h1>

      {/* message */}
      <h2 className="text-[32px] sm:text-[24px] font-semibold text-white mt-[-10px]">
        Page Not Found
      </h2>
      <p className="text-[16px] sm:text-[14px] text-center max-w-md text-gray-300 mt-2">
        Oops! The page you’re looking for doesn’t exist or might have been
        moved.
      </p>

      {/* return button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/")}
        className="mt-10 px-8 py-3 rounded-full font-semibold bg-[#00BFFF] text-white shadow-[0_8px_25px_rgba(0,191,255,0.3)] hover:shadow-[0_8px_35px_rgba(0,191,255,0.5)] hover:bg-[#00A9E0] transition-all duration-300"
      >
        Return Home
      </motion.button>

      {/* extra subtle floating accent */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[150px] h-[150px] bg-[#00BFFF]/10 border border-[#00BFFF]/20 rounded-full bottom-[15%] left-[10%]"
      ></motion.div>
    </div>
  );
};

export default PageNotFound;
