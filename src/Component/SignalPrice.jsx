import React from "react";
import slack from "../Assets/slack.png";
import AOS from "aos";
import "aos/dist/aos.css";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/init-firebase";

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


const cardDetails = [
  {
    title: "BASIC FXB SIGNALS",
    price: "$30.00",
    duration: "/ Month",
  },
  {
    title: "STANDARD FXB SIGNALS",
    price: "$30.00",
    duration: "/ 3 Month",
  },
  {
    title: "PREMIUM FXB SIGNALS",
    price: "$30.00",
    duration: "/ 6 Month",
  },
];
const SignalPrice = () => {
  const [Ebooks, setEbooks] = useState([]);
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  const [Signals, setSignals] = useState([]);
  // const [skeleton, setSkeleton] = useState(true);

  useEffect(() => {
    getSignals();
  }, []);

  useEffect(() => {
    // console.log(products)
  }, [Signals]);

  function getSignals() {
    const SignalRef = collection(db, "Signals");

    getDocs(SignalRef)
      .then((response) => {
        const Signal = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        // setSkeleton(false)
        setSignals(Signal);
      })
      .catch((error) => console.log(error.message));
  }


  return (
    <div>
      <div className="flex flex-row sm:flex-col    justify-between sm:px-0 px-[50px]">
        {Signals.map((item, index) => (
          <div className="flex sm:flex-col gap-[30px] sm:gap-[50px] sm:mt-[100px]  flex-col">
            <div
              data-aos="zoom-out"
              id="box"
              className=" hover:text-lightblue bg-white flex text-textcolor justify-center gap-[10px] items-center sm:h-[300px] flex-col shadow-xl  rounded-xl p-[30px]">
              <h1 className="sm:text-[30px]">{item.data.Title}</h1>
              <h1 className="font-bold sm:text-[30px]  text-[24px]">
                {item.data.Price}
              </h1>
              <h1 className="text-[13px] sm:text-[30px] hover:text-textcolor">
                {item.data.Duration}
              </h1>
            </div>
            <div className="text-center">
              <button className="bg-lightblue w-[130px] sm:w-[170px] sm:h-[60px] h-[40px] rounded-2xl text-[14px] sm:text-[20px] font-bold">
                BUY NOW
              </button>
            </div>
            <div
              data-aos="zoom-out"
              id="box"
              className="bg-white flex flex-col justify-between  h-contain text-center shadow-2xl w-[270px] sm:w-[100%] text-[16px] font-bold text-textcolor sm:h-[800px] rounded-xl py-[50px] pt-[-30px] ">
              <div className="flex items-start gap-[10px] border-b border-footer p-[20px]">
                <div className="sm:pt-[10px]">
                  <p> ✅</p>
                </div>
                <div className="">
                  <p className="sm:text-center sm:text-[28px]">
                    Daily signals on a variety of currency pairs
                  </p>
                </div>
              </div>

              <div className=" flex items-center gap-[10px] justify-center  border-b h-[80px] border-footer mx-[50px] py-[25px] px-[5px]">
                <p> ✅</p>
                <p className="sm:text-[28px]">85% Win-Rate</p>
              </div>
              <div className="flex items-start gap-[10px] justify-center border-b border-footer p-[20px]">
                <p className="sm:pt-[10px]"> ✅</p>
                <p className="sm:text-[28px]">
                  Daily signals on a variety of currency pairs
                </p>
              </div>
              <div className=" flex items-center gap-[10px] justify-center  border-b h-[80px] border-footer mx-[50px] py-[25px] px-[5px]">
                <p> ✅</p>
                <p className="sm:text-[28px]">85% Win-Rate</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <p className="text-[14px] text-center mt-[40px] font-bold text-blue sm:text-lightblue sm:text-[28px]">
          Sign Up With Our Recommended Broker For the Best Spreads and Execution
        </p>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-1 gap-[90px]  place-items-center mt-[150px]">
        {res.map((item, index) => (
          <div className="">
            <img
              src={item.img}
              alt=""
              width={370}
              className="h-[370px] sm:h-[700px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignalPrice;
