import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/init-firebase";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../lib/init-firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const addUserToDb = async (newUserId) => {
  try {
    const userRef = collection(db, "Accounts");
    await addDoc(userRef, {
      id: newUserId,
      userPaidCourse: [],
    });
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    toast.error("Error saving user to database");
  }
};

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation rules
    const symbolPattern = /[!@#$%^&*()_\-+=<>?]/;
    const uppercasePattern = /[A-Z]/;
    const numberPattern = /[0-9]/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!email || !password || !confirmpassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!emailPattern.test(email)) {
      toast.error("Invalid email format");
      return;
    }
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (
      !symbolPattern.test(password) ||
      !uppercasePattern.test(password) ||
      !numberPattern.test(password)
    ) {
      toast.error(
        "Password must include at least 1 symbol, 1 uppercase letter, and 1 number."
      );
      return;
    }

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Send verification email
      await sendEmailVerification(userCredential.user);
      toast.success("Verification email sent! Please check your inbox.");

      // Save user in Firestore
      await addUserToDb(userCredential.user.uid);

      toast.success("Account created successfully!");
      navigate("/log"); // redirect to login
    } catch (error) {
      console.error("Signup error:", error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-lightblue flex justify-center items-center h-[100vh]">
      <div className="bg-white w-[30%] sm:w-[80%] flex flex-col justify-between items-center px-[20px] py-[30px] h-[50%] mt-[100px] sm:mt-[-20px]">
        <input
          type="email"
          placeholder="Email"
          className="w-full outline-none px-[10px] h-[15%] bg-divider"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full outline-none px-[10px] h-[15%] bg-divider"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full outline-none px-[10px] h-[15%] bg-divider"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          className="bg-blue w-full h-[15%] text-[14px] text-white"
          onClick={handleSignup}>
          Sign Up
        </button>

        <p className="text-[14px] cursor-pointer">
          Already have an account?{" "}
          <Link to="/log">
            <span className="text-lightblue">Login</span>
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
