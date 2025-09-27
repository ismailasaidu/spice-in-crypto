import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../lib/init-firebase";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        toast.error("Please verify your email before logging in.");
        await signOut(auth);
        return;
      }

      localStorage.setItem(
        "Account",
        JSON.stringify({ loggedIn: true, id: user.uid })
      );

      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="bg-lightblue flex justify-center items-center h-[100vh]">
      <div className="bg-white w-[30%] sm:w-[80%] flex justify-between items-center flex-col px-[20px] py-[30px] h-[50%] mt-[100px] sm:mt-[-20px]">
        <input
          type="email"
          placeholder="Email"
          className="w-[100%] outline-none px-[10px] h-[15%] bg-divider"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-[100%] outline-none px-[10px] h-[15%] bg-divider"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue w-[100%] h-[15%] text-[14px] text-white"
          onClick={loginUser}>
          Login
        </button>
        <p className="text-[14px] cursor-pointer">
          Don’t have an account?{" "}
          <Link to="/signup">
            <span className="text-lightblue">Sign Up</span>
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
