import React from "react";
import slack from "../Assets/slack.png";
import peakpx from "../Assets/peakpx.jpg";
import { useEffect } from "react";

const typeDetails = [
  {
    h1: "Scalping",
    p: " Traders hold trades for a short period of time and take profits. Traders open big lot sizes to catch a few pips and leave the markets. They usually trade these times frames below 15 Minute i.e m5 and m1. They are many scalpingstrategies traders use and am going to discuss them in here. When scalping, a trader starts analyzing the markets from H4 and scales down to the entry time frame which can be m1or m5.",
    imgSrc: "/peakpx.jpg",
  },
  {
    h1: "Scalping",
    p: " Traders hold trades for a short period of time and take profits. Traders open big lot sizes to catch a few pips and leave the markets. They usually trade these times frames below 15 Minute i.e m5 and m1. They are many scalpingstrategies traders use and am going to discuss them in here. When scalping, a trader starts analyzing the markets from H4 and scales down to the entry time frame which can be m1or m5.",
    imgSrc: "/peakpx.jpg",
  },
  {
    h1: "Scalping",
    p: " Traders hold trades for a short period of time and take profits. Traders open big lot sizes to catch a few pips and leave the markets. They usually trade these times frames below 15 Minute i.e m5 and m1. They are many scalpingstrategies traders use and am going to discuss them in here. When scalping, a trader starts analyzing the markets from H4 and scales down to the entry time frame which can be m1or m5.",
    imgSrc: "/peakpx.jpg",
  },
];

const Types = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

 
  return (
    <div className="text-textcolor px-[200px] flex flex-col sm:mt-[100px] md:px-[100px] sm:px-[20px] gap-[30px]">
      <div>
        <h1 className="font-bold text-[28px]  text- mt-[100px] text-center">
          Types Of Forex Trading
        </h1>
      </div>
      <div className="font-medium">
        <div className="flex gap-[10px] flex-row items-center sm:items-start">
        <p> ✅</p>
          <p className="sm:text-[22px]">New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
        </div>
        <div className="flex gap-[10px] flex-row items-center sm:items-start">
        <p> ✅</p>
          <p  className="sm:text-[22px]">New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
        </div>
        <div className="flex gap-[10px] flex-row items-center sm:items-start">
        <p> ✅</p>
          <p  className="sm:text-[22px]">New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
        </div>
      </div>
      <div>
        <p className="sm:text-[18px]">Click This Link To Trade With The Best Broker</p>
      </div>
      <div className="flex flex-col gap-[40px]">
        {typeDetails.map((item, index) => (
          <div className="flex flex-row sm:flex-col gap-[30px] items-center">
            <div className="w-[400px] sm:w-[100%] flex-1">
              <h1 className="underline sm:text-[24px] sm:font-bold text-[20px] ">{item.h1}</h1>
              <p className="font-bold sm:text-[22px] sm:font-medium">{item.p}</p>
            </div>

            <div className="flex flex-[1.5px]">
              <img src={item.imgSrc} alt="" width={900} height={300}  />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Types;
