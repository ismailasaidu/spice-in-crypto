import React from "react";
import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../lib/init-firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
 
  const navigate = useNavigate();
  const upload = async (e) => {
    e.preventDefault();

  
    const symbolPattern = /[!@#$%^&*()_\-+=<>?]/;
    const uppercasePattern = /[A-Z]/;
    const numberPattern = /[0-9]/;
    function isValidEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
    }

    if (!email || !password || !confirmpassword) {
      toast.error("Please fill input fields");
    } else if (!isValidEmail(email)) {
      toast.error("inavlid Email");
    } else if (password !== confirmpassword) {
      toast.error("Password doesnt match");
    } else if (
      !symbolPattern.test(password) ||
      !uppercasePattern.test(password) ||
      !numberPattern.test(password)
    ) {
      toast.error(
        "Password needs to have at least one symbol, one uppercase letter, and one number."
      );
    } else if (isValidEmail(email) && password === confirmpassword) {
      const SignalsRef = collection(db, "Accounts");
      addDoc(SignalsRef, {
        Email: email,
        Password: password,
      })
        .then((res) => {
          console.log(res);
          navigate("/checkout");
          // navigate("")
        })
        .catch((err) => {
          console.log(err);
          alert("error");
        });
    }
  };

  return (
    <div className="bg-lightblue flex justify-center items-center h-[100vh]">
      <div className="bg-white w-[30%] flex justify-between items-center flex-col px-[20px] py-[30px] h-[50%] mt-[100px]">
        <input
          type="email"
          placeholder="Email"
          className="w-[100%] outline-none px-[10px] h-[15%] bg-divider"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-[100%] outline-none px-[10px] h-[15%] bg-divider"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-[100%] outline-none px-[10px] h-[15%] bg-divider"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />

        <button
          className="bg-blue w-[100%] h-[15%] text-[14px] text-white"
          onClick={upload}>
          Sign Up
        </button>
        <p className="text-[14px] cursor-pointer">
          Already have an account?{" "}
          <Link to="/log">
          <span className="text-lightblue" >
            Login
          </span>
          </Link>
         
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
