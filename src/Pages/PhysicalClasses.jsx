import React from "react";
import logo from "../Assets/logo.png";
import peakpx from "../Assets/peakpx.jpg";
import slack from "../Assets/slack.png";

const WYG = [
 
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
  { p: "Physical Training (Kampala trading floor)" },
];

const PhysicalClasses = () => {
  return (
    <div className="flex text-textcolor relative flex-col pt-[150px] px-[250px] sm:mt-[100px] sm:px-[80px] gap-[40px] ">
      <img src={logo} width={100} />
      <h1 className="font-bold text-[24px] sm:text-[28px]">
        FOREX BULLS PHYSICAL<br></br> CLASSES (ONLY LIMITED TO<br></br> FIRST 20
        PEOPLE)
      </h1>
      <img src={peakpx} className="w-[]" />
      <p className="border-b-footer border-b-[1px] sm:text-[28px] pb-[20px] font-bold text-[18px]">
        What You Get
      </p>
      <div className="grid grid-cols-2 justify-between pb-[20px] border-b-footer border-b-[1px]">
        {WYG.map((item, index) => (
          <div className="flex  flex-row items-center mt-[10px] gap-[10px]">
           
           <p className="" > ✅</p>
            
              <p className="text-[18px]  sm:text-[14px] sm:font-bold">{item.p}</p>
         
          </div>
        ))}
      </div>
      <div className="relative">
      <p className="font-bold sm:text-[28px] text-[18px]">All for only $150. Claim your spot now!</p>
      <button className="absolute left-0 top-[50px] bg-lightblue w-[100px] h-[35px]  rounded-xl">Sign up</button>
      </div>
      
    </div>
  );
};

export default PhysicalClasses;
