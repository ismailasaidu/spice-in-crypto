import React from "react";
import slack from "../Assets/slack.png";
import reading from "../Assets/Reading.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Started from "./Started";

const Card = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="flex justify-center hidden  items-center flex-col mt-[100px]  sm:px-[40px] md:px-0 px-[200px] sm:gap-[10px] gap-[30px]">
      <div className="grid grid-cols-3 sm:grid-cols-1  md:grid-cols-2  sm:  gap-[60px] sm:gap-[100px]">
        <div
          data-aos="fade-up"
          className="flex gap-[30px] w-[300px] sm:w-[100%] flex-col items-center">
          <img src={slack} width={20} className="sm:w-[50px]" />
          <h1 className="uppercase text-center sm:text-[13px] ">
            Trading is a business
          </h1>
          <div className="w-[100px] sm:w-[25%] bg-lightblue h-[5px] mt-[-15px]"></div>
          <h1 className="font-bold text-textcolor sm:text-[18px]">
            Treat it like one.
          </h1>
        </div>
        <div
          data-aos="fade-up"
          className="bg-black text-headerwhite  px-[10px] flex items-center gap-[20px] flex-col mt-[20px] rounded-lg  w-[270px] sm:w-[100%] h-[200px] sm:h-[250px]">
          <div className="bg-lightblack flex justify-center  w-[90px]  sm:w-[80px] h-[90px] sm:h-[80px] mt-[-40px] sm:mt-[-40px] rounded-full">
            <div className=" w-[70px] sm:w-[50px] flex justify-center last:bg-lightblue h-[70px] sm:h-[50px] mt-[10px] sm:mt-[15px] rounded-full">
              <img
                src={reading}
                alt=""
                className="w-[20px] sm:w-[20px] h-[20px] sm:h-[20px] mt-[20px] sm:mt-[15px]"
              />
            </div>
          </div>
          <div className="flex gap-[20px]  bp-[30px] flex-col items-center">
            <h1 className="uppercase text-center sm:text-[18px] ">
              Cut your losses quickly,
              <br /> without hesitation.
            </h1>
            <div className="w-[100px] bg-lightblue h-[5px] mt-[-8px]"></div>
            <h1 className="font-bold sm:text-[18px] text-center text-headerwhite">
              Don't waste time hoping that a bad trade will turn around.
            </h1>
          </div>
        </div>
        <div
          data-aos="fade-up"
          className="flex gap-[30px] w-[300px] sm:mt-[-120px] sm:w-[100%] flex-col items-center">
          <img src={slack} width={20} className="sm:w-[50px]" />
          <h1 className="uppercase text-center sm:text-[13px] ">
            Risk comes from not knowing what you're doing.
          </h1>
          <div className="w-[100px] sm:w-[25%] bg-lightblue h-[5px] mt-[-15px]"></div>
          <h1 className="font-bold text-textcolor text-center sm:text-[18px]">
            The goal of a profitable trader is to make money, not to be right!
          </h1>
        </div>
        <div
          data-aos="fade-up"
          className="flex gap-[30px] w-[300px] sm:w-[100%] flex-col items-center">
          <img src={slack} width={20} className="sm:w-[50px]" />
          <h1 className="uppercase text-center sm:text-[13px] ">
            In trading, it's not about how much you make
          </h1>
          <div className="w-[100px] sm:w-[25%] bg-lightblue h-[5px] mt-[-15px]"></div>
          <h1 className="font-bold text-textcolor sm:text-[18px]">
            but rather how much you don't lose
          </h1>
        </div>
        <div
          data-aos="fade-up"
          className="bg-black text-headerwhite  flex items-center gap-[20px] flex-col mt-[20px] rounded-lg  w-[270px] sm:w-[100%] h-[200px] sm:h-[250px]">
          <div className="bg-lightblack flex justify-center  w-[90px]  sm:w-[80px] h-[90px] sm:h-[80px] mt-[-40px] sm:mt-[-40px] rounded-full">
            <div className=" w-[70px] sm:w-[50px] flex justify-center last:bg-lightblue h-[70px] sm:h-[50px] mt-[10px] sm:mt-[15px] rounded-full">
              <img
                src={reading}
                alt=""
                className="w-[20px] sm:w-[20px] h-[20px] sm:h-[20px] mt-[20px] sm:mt-[15px]"
              />
            </div>
          </div>
          <div className="flex gap-[20px]  bp-[30px] flex-col items-center">
            <h1 className="uppercase text-center sm:text-[18px] ">
              The goal of a successful trader is to make the best trades
            </h1>
            <div className="w-[100px] bg-lightblue h-[5px] mt-[-8px]"></div>
            <h1 className="font-bold sm:text-[18px] text-headerwhite">
              Money is secondary.
            </h1>
          </div>
        </div>
        <div
          data-aos="fade-up"
          className="flex gap-[30px] w-[300px] sm:mt-[-120px] sm:w-[100%] flex-col items-center">
          <img src={slack} width={20} className="sm:w-[50px]" />
          <h1 className="uppercase text-center sm:text-[13px] ">
            In trading, you have to be defensive
          </h1>
          <div className="w-[100px] sm:w-[25%] bg-lightblue h-[5px] mt-[-15px]"></div>
          <h1 className="font-bold text-textcolor sm:text-[18px]">
            and aggressive at the same time
          </h1>
        </div>
        <div
          data-aos="fade-up"
          className="flex gap-[30px] w-[300px] sm:w-[100%] flex-col items-center">
          <img src={slack} width={20} className="sm:w-[50px]" />
          <h1 className="uppercase text-center sm:text-[13px] ">
            Don't focus on making money
          </h1>
          <div className="w-[100px] sm:w-[25%] bg-lightblue h-[5px] mt-[-15px]"></div>
          <h1 className="font-bold text-textcolor sm:text-[18px]">
            focus on protecting what you have!
          </h1>
        </div>
        <div
          data-aos="fade-up"
          className="bg-black text-headerwhite  flex items-center gap-[20px] flex-col mt-[20px] rounded-lg  w-[270px] sm:w-[100%] h-[200px] sm:h-[250px]">
          <div className="bg-lightblack flex justify-center  w-[90px]  sm:w-[80px] h-[90px] sm:h-[80px] mt-[-40px] sm:mt-[-40px] rounded-full">
            <div className=" w-[70px] sm:w-[50px] flex justify-center last:bg-lightblue h-[70px] sm:h-[50px] mt-[10px] sm:mt-[15px] rounded-full">
              <img
                src={reading}
                alt=""
                className="w-[20px] sm:w-[20px] h-[20px] sm:h-[20px] mt-[20px] sm:mt-[15px]"
              />
            </div>
          </div>
          <div className="flex gap-[20px]  bp-[30px] flex-col items-center">
            <h1 className="uppercase text-center sm:text-[18px] ">
              The market is a device for transferring money
            </h1>
            <div className="w-[100px] bg-lightblue h-[5px] mt-[-8px]"></div>
            <h1 className="font-bold sm:text-[18px] text-headerwhite">
              from the impatient to the patient.
            </h1>
          </div>
        </div>
        <div
          data-aos="fade-up"
          className="flex gap-[30px] w-[300px] sm:mt-[-120px] sm:w-[100%] flex-col items-center">
          <img src={slack} width={20} className="sm:w-[50px]" />
          <h1 className="uppercase text-center sm:text-[13px] ">
            It is not the strongest or the most intelligent who will survive
          </h1>
          <div className="w-[100px] sm:w-[25%] bg-lightblue h-[5px] mt-[-15px]"></div>
          <h1 className="font-bold text-textcolor text-center sm:text-[18px]">
            but those who can best manage change
          </h1>
        </div>
      </div>

      <p className="text-center    mt-[30px]  sm:mt-[40px]  font-bold text-[14px] text-textcolor">
        Learn how to trade the financial market profitably today, with no
        experienve but with a winning system{" "}
      </p>
      {/* <p className="text-center hidden sm:block sm:mt-[50px] text-[18px] font-black text-textcolor">
        Learn how to trade the financial market<br></br> profitably today, with
        no experienve but<br></br> with a winning system{" "}
      </p> */}
    </div>
  );
};

export default Card;
