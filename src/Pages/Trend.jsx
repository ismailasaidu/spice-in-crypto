import React from "react";
import slack from "../Assets/slack.png";
// import slack from "../Assets/slack.png";

import { Container } from "react-bootstrap";
import { useEffect } from "react";



  // return (
  //   <div className="text-textcolor px-[200px] md:px-[100px] flex flex-col gap-[30px] sm:mt-[80px] sm:px-[50px]">
  //     <div>
  //       <h1 className="font-bold text-[28px] text- mt-[100px]  text-center ">
  //         Types Of Forex Trading
  //       </h1>
  //     </div>
  //     <div className="font-medium">
  //       <div className="flex gap-[10px] flex-row items-center ">
     
  //         <h1 className="font-semibold text-[18px] text-">CHOOSING A STRONG RISK MANAGEMENT STRATEGY.</h1>
  //       </div>
  //       <div className="flex  gap-[10px] flex-row items-center">
     
  //         <p React from "react";

  const WYG = [
    { p: " Know your risk appetite." },
    { p: " Choose a tested risk-to-reward ratio and stick to it." },
    { p: "Stick to a few trades per day." },
    { p: "Use stop-loss orders." },
    { p: " Choose a reasonable position size. The best is 1-2% of your portfolio per trade idea." },
    { p: "Stay informed about market conditions." },
    { p: "Be disciplined and stick to your risk management plan." },
    { p: "Backtest and review your strategy." },
    { p: "Seek professional advice if needed. " },
    { p: " Be cautious with leverage. Use it wisely.  " },
  

  ];
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
];

const Trend = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="text-textcolor px-[200px] md:px-[100px] flex flex-col gap-[30px] sm:mt-[80px] sm:px-[50px]">
      <div>
        <h1 className="font-bold text-[28px] text- mt-[100px]  text-center ">
          Types Of  Trading
        </h1>
      </div>
      <div className="font-medium">
        <div className="flex gap-[10px] flex-row items-center ">
     
          <h1 className="font-semibold text-[18px] text-">CHOOSING A STRONG RISK MANAGEMENT STRATEGY.</h1>
        </div>
        <div className="flex  gap-[10px] flex-row items-center">
     
          <p>Choosing a strong risk management strategy in trading is crucial to protect your capital and maximize your chances of being profitable. Here's a step-by-step guide to help you choose an effective risk management strategy:</p>
        </div>
      </div>
      <div>
        <p 
        className="cursor-pointer underline text-lightblue"
         onClick={() => {
          window.open(
            "https://partner.bybit.com/b/56682"
          );
        }}
        >Click This Link To Trade With The Best Exchanger</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-1 justify-between pb-[20px] ">
        {WYG.map((item, index) => (
          <div className="flex  flex-row  items-start mt-[10px] gap-[10px]">
            <p className=""> ✅</p>

            <p className="text-[18px]  sm:text-[14px] sm:font-bold">{item.p}</p>
          </div>
        ))}
      </div>
      <div className="text-textcolor font-semibold">
        <p>Remember there's no one way of doing this. Your main goal should be to follow your plan while aiming for consistent, sustainable returns.</p>
      </div>
   
    </div>
  );
};

export default Trend;


