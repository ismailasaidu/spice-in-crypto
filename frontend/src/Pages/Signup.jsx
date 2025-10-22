import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../lib/init-firebase";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Add user to Firestore
const addUserToDb = async (newUser) => {
  try {
    const userRef = collection(db, "Accounts");
    await addDoc(userRef, {
      uid: newUser.uid,
      email: newUser.email,
      createdAt: new Date(),
      lastLogin: new Date(),
      isAdmin: false,
      userPaidCourse: [],
      cart: [],
    });
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    toast.error("Error saving user to database");
  }
};

// Friendly error messages
const getFriendlyErrorMessage = (error) => {
  const errorMap = {
    "auth/email-already-in-use": "This email is already registered.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password is too weak. Use 6+ characters.",
  };
  return errorMap[error.code] || "Something went wrong. Please try again.";
};

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const symbolPattern = /[!@#$%^&*()_\-+=<>?]/;
    const uppercasePattern = /[A-Z]/;
    const numberPattern = /[0-9]/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!email || !password || !confirmpassword) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }
    if (!emailPattern.test(email)) {
      toast.error("Invalid email format");
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      setLoading(false);
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
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(userCredential.user);
      toast.success("Verification email sent! Please check your inbox.");

      await addUserToDb({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      });

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(getFriendlyErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-lightblue flex justify-center items-center h-[100vh]">
      <div className="bg-white w-[30%] sm:w-[80%] flex flex-col justify-between items-center px-[20px] py-[30px] h-[50%] mt-[100px] sm:mt-[-20px] rounded-lg shadow-lg">
        <input
          type="email"
          placeholder="Email"
          className="w-full outline-none px-[10px] h-[15%] bg-divider rounded mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full outline-none px-[10px] h-[15%] bg-divider rounded mb-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full outline-none px-[10px] h-[15%] bg-divider rounded mb-4"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className={`bg-blue w-full h-[15%] text-[14px] text-white rounded hover:bg-blue-700 transition ${
            loading ? "opacity-80 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-[14px] cursor-pointer mt-2">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-lightblue underline">Login</span>
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
