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
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

 

  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  const [Signals, setSignals] = useState([]);
  useEffect(() => {
    getSignals();
  }, []);

  useEffect(() => {
    console.log(Signals);
  }, []);

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
    <div className="mx-[100px] md:px-0  py-[100px] sm:py-[100px]">
      <div className=" text-center flex items-center gap-[30px] flex-col mt-[50px]">
        <div>
          <h1 className=" text-[34px] sm:text-[20px] text-textcolor text-MT font-bold">
            Our Pricing
          </h1>
        </div>

        <div className="w-[80px] h-[3px]  bg-anime"></div>
      </div>
      <div data-aos="zoom-out" className="mx-[100px] sm:mx-[10%] md:flex-col justify-center gap-[40px] items-center flex sm:flex-col flex-row pt-[70px] ">
        {Signals.slice()
          .reverse()
          .map((item, index) => (
            <SignalPrice item={item} index={index} />
          ))}
      </div>
      <div>
        <p className="text-[14px] text-center mt-[40px] sm:px-[20px] font-bold text-blue sm:text-lightblue sm:text-[18px]">
          Sign Up With Our Recommended Broker For the Best Spreads and Execution
        </p>
      </div>
      <div className=" text-center flex items-center gap-[30px] flex-col mt-[50px]">
        <div>
          <h1 className=" text-[34px] sm:text-[20px] text-textcolor text-MT font-bold">
            Results
          </h1>
        </div>

        <div className="w-[80px] h-[3px]  bg-anime"></div>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-1 gap-[90px] sm: md:grid-cols-3  md:px-[50px] place-items-center mt-[150px]">
        {res.map((item, index) => (
          <div className="">
            <img
              src={item.img}
              alt=""
              width={370}
              className="h-[370px] sm:w-[250px] sm:h-[500px]"
            />
          </div>
        ))}
      </div>
      
    <ToastContainer/>
    </div>
  );
};

export default Signals;
