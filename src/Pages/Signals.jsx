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
import Mentorship from "../Component/Mentorship";

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
  const [Mentorships, setMentorships] = useState([]);

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
    getMentorships();
  }, []);

  // console.log("here", Signals);

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

  function getMentorships() {
    const Mentorship = collection(db, "Mentorship");
    getDocs(Mentorship)
      .then((response) => {
        const Mentorship = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setMentorships(Mentorship);
        // console.log(Mentorship)
      })

      .catch((error) => toast.error(error.message));
  }

  const dispatch = useDispatch();

  return (
    <div className="mx-[100px] md:px-0  mt-[100px] sm:pt-[100px] sm:mx-0">
      <div className=" text-center flex items-center gap-[30px] flex-col mt-[50px]">
        <div>
          <h1 className=" text-[34px] sm:text-[20px] text-textcolor text-MT font-bold">
            Our Mentorship
          </h1>
        </div>

        <div className="w-[80px] h-[3px]  bg-anime"></div>
      </div>
      <div
        data-aos="zoom-out"
        className="mx-[100px] sm:mx-[10px] md:flex-col justify-center gap-[40px] items-center flex sm:flex-col flex-row pt-[70px] ">
        {Mentorships.slice()
          .reverse()
          .map((item, index) => (
            <Mentorship item2={item} itemIndex2={index} />
          ))}
      </div>
      <div className=" text-center flex items-center gap-[30px] flex-col mt-[50px]">
        <div>
          <h1 className=" text-[34px] sm:text-[20px] text-textcolor text-MT font-bold">
            Our Signals
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
          Sign Up For Our Expert Signals
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Signals;
