import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth, db } from "../lib/init-firebase";
import { useNavigate , Link} from "react-router-dom";
import logo from "../Assets/logo.png"


const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emalVal = e.target.email.value;
    sendPasswordResetEmail(auth, emalVal)
      .then((data) => {
        alert("check your gmail");
        navigate("/log");
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="bg-lightblue flex justify-center items-center h-[100vh] ">
          <div className="bg-white w-[30%] sm:w-[80%] sm:mt-[-20px] flex gap-[15px] md:gap-[10px] sm:gap-[20px]  flex-col px-[50px] py-[60px]  h-[60%] mt-[100px] md:mt-[40px] relative ">
            <img src={logo} width={60} className="absolute right-[50px] sm:top-[15%]"/>
            <h1 className="text-black font-bold text-[18px] sm:text-[23px] mt-[50px] sm:mt-[40%]">Reset password</h1>
            <p className="text-[12px] sm:text-[14px] text-grey">
              Enter the email associated with your account and we wil send an
              email with instructions to reset you account
            </p>

            <input
              type="email "
              placeholder="Email"
              name="email"

              className="w-[100%] outline-none px-[10px] text-[10px] sm:text-[13px] h-[10%] bg-divider"
            />
            <Link to='/log'>
            <p className="text-[12px] sm:text-[13px] text-lightblue">
              Wait, i remember my password
            </p>
            </Link>

          
            <button className="bg-blue text-white text-[12px] sm:text-[14px] h-[10%]">Reset password</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
