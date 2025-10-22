import React, { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/init-firebase";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../Assets/logo.png";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Map Firebase errors to friendly messages
  const getFriendlyErrorMessage = (error) => {
    const errorMap = {
      "auth/user-not-found": "No account found with this email.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/too-many-requests": "Too many requests. Please try again later.",
    };
    return errorMap[error.code] || "Something went wrong. Please try again.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("We have sent a password reset email!");
      navigate("/login");
    } catch (err) {
      toast.error(getFriendlyErrorMessage(err));
    }
  };

  return (
    <div className="bg-lightblue flex justify-center items-center h-[100vh]">
      <div className="bg-white w-[30%] sm:w-[80%] sm:mt-[-20px] flex gap-[15px] md:gap-[10px] sm:gap-[20px] flex-col px-[50px] py-[60px] h-[60%] mt-[100px] md:mt-[40px] relative">
        <img
          src={logo}
          width={60}
          className="absolute right-[50px] sm:top-[15%]"
          alt="Logo"
        />
        <h1 className="text-black font-bold text-[18px] sm:text-[23px] mt-[50px] sm:mt-[40%]">
          Reset password
        </h1>
        <p className="text-[12px] sm:text-[14px] text-grey">
          Enter the email associated with your account and we will send an email
          with instructions to reset your account.
        </p>

        <input
          type="email"
          placeholder="Email"
          name="email"
          className="w-[100%] outline-none px-[10px] text-[10px] sm:text-[13px] h-[10%] bg-divider"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Link to="/login">
          <p className="text-[12px] sm:text-[13px] text-lightblue">
            Wait, I remember my password
          </p>
        </Link>

        <button
          onClick={handleSubmit}
          className="bg-blue text-white text-[12px] sm:text-[14px] h-[10%]"
        >
          Reset password
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgetPassword;
