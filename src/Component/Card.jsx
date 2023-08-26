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
    <div className="flex justify-center flex-col mt-[100px] sm:px-[130px] md:px-0 px-[150px] sm:gap-[40px] gap-[30px]">
      <div className="grid grid-cols-3 sm:grid-cols-1  md:grid-cols-2  sm:  gap-[60px] sm:gap-[100px]">
        <div
          data-aos="fade-up"
          className="flex gap-[30px] w-[300px] sm:w-[100%] flex-col items-center">
          <img src={slack} width={20} className="sm:w-[80px]" />
          <h1 className="uppercase text-center sm:text-[26px] ">
            Lorem ipsum dolor sit amet, consectetur adipisicing.
          </h1>
          <div className="w-[100px] sm:w-[25%] bg-blue sm:bg-lightblue h-[5px] mt-[-15px]"></div>
          <h1 className="font-bold text-textcolor sm:text-[24px]">
            Lorem ipsum dolor sit amet.
          </h1>
        </div>
        <div
          data-aos="fade-up"
          className="bg-black text-headerwhite flex items-center gap-[20px] flex-col mt-[20px] rounded-lg  w-[300px] sm:w-[100%] h-[220px] sm:h-[400px]">
          <div className="bg-lightblack flex justify-center  w-[90px]  sm:w-[150px] h-[90px] sm:h-[150px] mt-[-40px] sm:mt-[-50px] rounded-full">
            <div className=" w-[70px] sm:w-[100px] flex justify-center bg-blue sm:bg-lightblue h-[70px] sm:h-[100px] mt-[10px] sm:mt-[25px] rounded-full">
              <img
                src={reading}
                alt=""
                className="w-[20px] sm:w-[40px] h-[20px] sm:h-[40px] mt-[20px] sm:mt-[30px]"
              />
            </div>
          </div>
          <div className="flex gap-[20px]  bp-[30px] flex-col items-center">
            <h1 className="uppercase text-center sm:text-[26px] ">
              Lorem ipsum dolor sit amet,
              <br /> consectetur adipisicing.
            </h1>
            <div className="w-[100px] bg-blue sm:bg-lightblue h-[5px] mt-[-8px]"></div>
            <h1 className="font-bold sm:text-[18px] text-headerwhite">
              Lorem ipsum dolor sit amet.
            </h1>
          </div>
        </div>
        <div
          data-aos="fade-up"
          className="flex  sm:mt-[-120px] z-30 gap-[30px] w-[300px] sm:w-[100%] flex-col items-center">
          <img src={slack} width={20} className="sm:w-[80px]" />
          <h1 className="uppercase text-center sm:text-[26px] ">
            Lorem ipsum dolor sit amet, consectetur adipisicing.
          </h1>
          <div className="w-[100px] sm:w-[25%] bg-blue sm:bg-lightblue h-[5px] mt-[-15px]"></div>
          <h1 className="font-bold text-textcolor sm:text-[24px]">
            Lorem ipsum dolor sit amet.
          </h1>
        </div>
     
      
        <div
          data-aos="fade-up"
          className="flex gap-[30px] w-[300px] sm:w-[100%] flex-col items-center">
          <img src={slack} width={20} className="sm:w-[80px]" />
          <h1 className="uppercase text-center sm:text-[26px] ">
            Lorem ipsum dolor sit amet, consectetur adipisicing.
          </h1>
          <div className="w-[100px] sm:w-[25%] bg-blue sm:bg-lightblue h-[5px] mt-[-15px]"></div>
          <h1 className="font-bold text-textcolor sm:text-[24px]">
            Lorem ipsum dolor sit amet.
          </h1>
        </div>
        <div
          data-aos="fade-up"
          className="bg-black text-headerwhite flex items-center gap-[20px] flex-col mt-[20px] rounded-lg  w-[300px] sm:w-[100%] h-[220px] sm:h-[400px]">
          <div className="bg-lightblack flex justify-center  w-[90px]  sm:w-[150px] h-[90px] sm:h-[150px] mt-[-40px] sm:mt-[-50px] rounded-full">
            <div className=" w-[70px] sm:w-[100px] flex justify-center bg-blue sm:bg-lightblue h-[70px] sm:h-[100px] mt-[10px] sm:mt-[25px] rounded-full">
              <img
                src={reading}
                alt=""
                className="w-[20px] sm:w-[40px] h-[20px] sm:h-[40px] mt-[20px] sm:mt-[30px]"
              />
            </div>
          </div>
          <div className="flex gap-[20px]  bp-[30px] flex-col items-center">
            <h1 className="uppercase text-center sm:text-[26px] ">
              Lorem ipsum dolor sit amet,
              <br /> consectetur adipisicing.
            </h1>
            <div className="w-[100px] bg-blue sm:bg-lightblue h-[5px] mt-[-8px]"></div>
            <h1 className="font-bold sm:text-[18px] text-headerwhite">
              Lorem ipsum dolor sit amet.
            </h1>
          </div>
        </div>
        <div
          data-aos="fade-up"
          className="flex  sm:mt-[-120px] z-30 gap-[30px] w-[300px] sm:w-[100%] flex-col items-center">
          <img src={slack} width={20} className="sm:w-[80px]" />
          <h1 className="uppercase text-center sm:text-[26px] ">
            Lorem ipsum dolor sit amet, consectetur adipisicing.
          </h1>
          <div className="w-[100px] sm:w-[25%] bg-blue sm:bg-lightblue h-[5px] mt-[-15px]"></div>
          <h1 className="font-bold text-textcolor sm:text-[24px]">
            Lorem ipsum dolor sit amet.
          </h1>
        </div>
    
      
        <div
          data-aos="fade-up"
          className="flex gap-[30px] w-[300px] sm:w-[100%] flex-col items-center">
          <img src={slack} width={20} className="sm:w-[80px]" />
          <h1 className="uppercase text-center sm:text-[26px] ">
            Lorem ipsum dolor sit amet, consectetur adipisicing.
          </h1>
          <div className="w-[100px] sm:w-[25%] bg-blue sm:bg-lightblue h-[5px] mt-[-15px]"></div>
          <h1 className="font-bold text-textcolor sm:text-[24px]">
            Lorem ipsum dolor sit amet.
          </h1>
        </div>
        <div
          data-aos="fade-up"
          className="bg-black text-headerwhite flex items-center gap-[20px] flex-col mt-[20px] rounded-lg  w-[300px] sm:w-[100%] h-[220px] sm:h-[400px]">
          <div className="bg-lightblack flex justify-center  w-[90px]  sm:w-[150px] h-[90px] sm:h-[150px] mt-[-40px] sm:mt-[-50px] rounded-full">
            <div className=" w-[70px] sm:w-[100px] flex justify-center bg-blue sm:bg-lightblue h-[70px] sm:h-[100px] mt-[10px] sm:mt-[25px] rounded-full">
              <img
                src={reading}
                alt=""
                className="w-[20px] sm:w-[40px] h-[20px] sm:h-[40px] mt-[20px] sm:mt-[30px]"
              />
            </div>
          </div>
          <div className="flex gap-[20px]  bp-[30px] flex-col items-center">
            <h1 className="uppercase text-center sm:text-[26px] ">
              Lorem ipsum dolor sit amet,
              <br /> consectetur adipisicing.
            </h1>
            <div className="w-[100px] bg-blue sm:bg-lightblue h-[5px] mt-[-8px]"></div>
            <h1 className="font-bold sm:text-[18px] text-headerwhite">
              Lorem ipsum dolor sit amet.
            </h1>
          </div>
        </div>
        <div
          data-aos="fade-up"
          className="flex  sm:mt-[-120px] z-30 gap-[30px] w-[300px] sm:w-[100%] flex-col items-center">
          <img src={slack} width={20} className="sm:w-[80px]" />
          <h1 className="uppercase text-center sm:text-[26px] ">
            Lorem ipsum dolor sit amet, consectetur adipisicing.
          </h1>
          <div className="w-[100px] sm:w-[25%] bg-blue sm:bg-lightblue h-[5px] mt-[-15px]"></div>
          <h1 className="font-bold text-textcolor sm:text-[24px]">
            Lorem ipsum dolor sit amet.
          </h1>
        </div>
      </div>
     

      <p className="text-center  sm:hidden sm:px-[100px] sm:mt-[100px] ml-[50px] font-black text-textcolor">
        Learn how to trade the financial market profitably today, with no
        experienve but with a winning system{" "}
      </p>
      <p className="text-center hidden sm:block  sm:mt-[50px] text-[28px] font-black text-textcolor">
        Learn how to trade the financial market<br></br> profitably today, with no
        experienve but<br></br> with a winning system{" "}
      </p>
      
    </div>
  );
};

export default Card;
