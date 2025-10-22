import React from "react";
import slack from "../Assets/slack.png";
import peakpx from "../Assets/peakpx.jpg";
import { useEffect } from "react";

const typeDetails = [
  {
    h1: "SCALPING",
    p: "A short-term strategy where traders make quick, small-profit trades within seconds to minutes, aiming to capitalize on minor price movements. It involves low risk per trade but requires rapid decision-making and intense focus.",
    imgSrc: "/scalping.png",
  },
  {
    h1: "INTRA-DAY TRADING (DAY TRADING)",
    p: " Traders open and close positions within the same trading day, seeking to profit from daily price fluctuations. Timeframes range from minutes to hours, with moderate risk and the goal of closing all positions by day's end. ",
    imgSrc: "/day.png",
  },
  {
    h1: "SWING TRADING",
    p: " Now, swing trading takes a slightly longer approach. Trades here are held from a few days to a few weeks, capturing price swings. This style requires less monitoring compared to day trading, making it suitable for those with busier schedules.",
    imgSrc: "/swing.png",
  }, {
    h1: "POSITION TRADING",
    p: " A longer-term strategy where traders hold positions for weeks, months, or even years. It involves higher risk due to the extended holding time but offers potential for higher rewards. It relies on fundamental analysis and macroeconomic trends.",
    imgSrc: "/position.jpg",
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
        <h1 className="font-bold text-[28px]  text- mt-[100px] sm:mt-[50px] text-center">
          Types Of  Trading
        </h1>
      </div>
      {/* <div className="font-medium">
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
      </div> */}
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
      <div className="flex flex-col gap-[40px]">
        {typeDetails.map((item, index) => (
          <div className="flex flex-row sm:flex-col gap-[30px] items-center">
            <div className="w-[400px] sm:w-[100%] flex-1">
              <h1 className="underline sm:text-[20px] sm:font-bold text-[20px] ">{item.h1}</h1>
              <p className="font-bold sm:text-[18px] sm:font-medium">{item.p}</p>
            </div>

            <div className="flex flex-[1.5px]">
              <img src={item.imgSrc} alt="" width={300} height={300}  />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Types;
