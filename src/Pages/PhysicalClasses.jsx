import React from "react";
import logo from "../Assets/logo.png";
import peakpx from "../Assets/peakpx.jpg";
import slack from "../Assets/slack.png";
import { useEffect } from "react";
import spice4 from "../Assets/spice4.jpeg"

const WYG = [
  { p: "In-depth look at the Crypto markets." },
  { p: "20+ hours of recorded lessons." },
  { p: "Introduction to futures trading. " },
  { p: "Breakdown of my trading strategy and techniques. " },
  { p: "Advanced Technical Analysis breakdown. " },
  { p: "Fundamental Analysis." },
  { p: "Risk Management." },
  { p: "Psychology. " },
  { p: "Free eBooks. " },
  { p: "A community of traders to grow with. " },
  { p: "And many more." },
  // { p: "Physical Training (Kampala trading floor)" },
  // { p: "Physical Training (Kampala trading floor)" },
  // { p: "Physical Training (Kampala trading floor)" },
  // { p: "Physical Training (Kampala trading floor)" },
  // { p: "Physical Training (Kampala trading floor)" },
  // { p: "Physical Training (Kampala trading floor)" },
  // { p: "Physical Training (Kampala trading floor)" },
  // { p: "Physical Training (Kampala trading floor)" },
  // { p: "Physical Training (Kampala trading floor)" },
];

const PhysicalClasses = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const navigateToWhatsApp = () => {
    const phoneNumber = encodeURIComponent("2348081590479");
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex text-textcolor relative flex-col py-[150px] md:py-[90px] px-[250px] md:px-[50px] sm:mt-[50px] sm:px-[40px] gap-[40px] ">
      <img src={logo} width={100} />
      <h1 className="font-bold text-[24px] sm:text-[18px]">
        SPICE IN CRYPTO PHYSICAL<br></br> CLASSES (ONLY LIMITED TO<br></br> FIRST 20
        PEOPLE)
      </h1>
      <img src={spice4} />
      <p className="border-b-footer border-b-[1px] sm:text-[18px] pb-[20px] font-bold text-[18px]">
      What Awaits You In This Masterclass
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-1 justify-between pb-[20px] border-b-footer border-b-[1px]">
        {WYG.map((item, index) => (
          <div className="flex  flex-row  items-center mt-[10px] gap-[10px]">
            <p className=""> ✅</p>

            <p className="text-[18px]  sm:text-[14px] sm:font-bold">{item.p}</p>
          </div>
        ))}
      </div>
      <div className="relative">
        <p className="font-bold sm:text-[18px] text-[18px]">
      Instead of $150 you will be getting all these for $120. Claim your spot now. 
        </p>
        <button className="absolute left-0 top-[50px] sm:top-[70px] bg-lightblue w-[100px] h-[35px]  rounded-xl" onClick={navigateToWhatsApp}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default PhysicalClasses;
