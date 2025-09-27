import React from "react";
import down from "../Assets/Down.png";
import { useState } from "react";
import Started from "./Started";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import {FaRegComments} from "react-icons/fa"

const Faq = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const [open, setopen] = useState("true");
  const Faq = [
    {
      h1: "Will this mentorship make me a pro trader?",
      p: "  With the value-packed videos and free materials, you'll to learn to trade like a pro trader. ",
    },
    {
      h1: "What are crypto futures?",
      p: "Crypto futures are like bets on where the price of cryptocurrencies will go, without actually owning them.",
    },
    {
      h1: " Can I make a lot of money from crypto trading?",
      p: "Yes! That's how I make a living.",
    },
    {
      h1: "How to stay safe?",
      p: "To be safe, don't risk too much money on one trade, and use tools like stop-loss orders to limit your losses.",
    },
       {
      h1: "What's leverage?",
      p: "Leverage is like a loan to make bigger trades, but it can make wins and losses much bigger, so be careful.",
    },
    {
      h1: "Is Crypto trading gambling?",
      p: "Yes it is if you don't have a profitable strategy.",
    },
  ];
  return (
    <div className=" mt-[100px] sm:px-[20px] ">
    
      <div className="items-center flex gap-[30px] sm:gap-[20px] flex-col">
        {Faq.map((item, index) => (
          <div
            data-aos="fade-left"
            id="box"
            className=" shadow-2xl  rounded-md p-[1px] bg-gradient-to-b sm:h-[155px]  h-[150px]  sm:w-[100%] w-[650px] ">
            <div className="rounded-md px-[20px]    sm:py-[20px]   sm:px-[0px] relative flex flex-col  text-center  gap-[30px] sm:gap-[10px] bg-white overflow-hidden">
              <FaRegComments color="#2C9ED7"   className="absolute w-[100px] h-[100px]  z-[-10px] opacity-[0.2] top-[-5px] sm:left-[-15px] sm:top-[2px] left-[-10px]"/>
            <i class="fa-light fa-comments  "></i>
              <div className=" ">
                <h1 className="font-bold text-textcolor sm:text-[16px] text-center text-[18px]">
                  {item.h1}
                </h1>
              </div>
              <div>
              <p className="text-[15px]  px-[30px] sm:px-[15px] text-textcolor">{item.p}</p>
              </div>
             
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Faq;
