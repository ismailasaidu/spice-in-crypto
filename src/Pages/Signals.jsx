import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import SignalPrice from "../Component/SignalPrice";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/init-firebase";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../redux/CartSlice";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const res = [
  {
    img: "/result1.jpg",
  },
  {
    img: "/result1.jpg",
  },
  {
    img: "/result1.jpg",
  },
  {
    img: "/result1.jpg",
  },
  {
    img: "/result1.jpg",
  },
  {
    img: "/result1.jpg",
  },
  {
    img: "/result1.jpg",
  },
  {
    img: "/result1.jpg",
  },
];

const Signals = () => {
  const [Signals, setSignals] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  useEffect(() => {
    getSignals();
  }, []);

  console.log("here", Signals);

  function getSignals() {
    const Signal = collection(db, "Signals");
    getDocs(Signal)
      .then((response) => {
        const signal = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setSignals(signal);
      })

      .catch((error) => toast.error(error.message));
  }

  const dispatch = useDispatch();

  return (
    <div className="mx-[100px] md:px-0  mt-[100px] sm:pt-[100px] sm:mx-0">
      <div className=" text-center flex items-center gap-[30px] flex-col mt-[50px]">
        <div>
          <h1 className=" text-[34px] sm:text-[20px] text-textcolor text-MT font-bold">
            Our Pricing
          </h1>
        </div>

        <div className="w-[80px] h-[3px]  bg-anime"></div>
      </div>
      <div
        data-aos="zoom-out"
        className="mx-[100px] sm:mx-[10px] md:flex-col justify-center gap-[40px] items-center flex sm:flex-col flex-row pt-[70px] ">
        {Signals.slice()
          .reverse()
          .map((item, index) => (
            <SignalPrice item={item} itemIndex={index} />
          ))}
      </div>
      <div>
        <p className="text-[14px] text-center mt-[50px] sm:px-[20px] font-bold text-blue sm:text-lightblue sm:text-[18px]">
          Sign Up For Our Expert Mentorship
        </p>
      </div>
      <div className="mx-[100px] flex items-center justify-center gap-[40px] mt-[40px] ">
        <div id="box" className="text-center flex flex-col bg-white shadow-2xl px-[10px] py-[35px] rounded-xl h-[170px] w-[200px] items-center justify-between">
          <h1 className=" font-bold text-lightblue">Online Mentorship</h1>
          <h1 className="font-bold">$30</h1>
          <button className="bg-lightblue w-[100px] text-[14px] rounded-2xl h-[35px] font-bold">
            Enroll
          </button>
        </div>
        <div id="box" className="text-center flex flex-col bg-white shadow-2xl px-[10px] py-[35px] rounded-xl h-[170px] w-[200px] items-center justify-between">
          <h1 className=" font-semibold text-lightblue">Physical Mentorship</h1>
          <h1 className="font-bold">$50</h1>
          <button className="bg-lightblue w-[100px] text-[14px] rounded-2xl h-[35px] font-bold">
            Enroll 
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signals;
