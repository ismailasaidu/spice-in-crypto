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
      h1: "   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suntoptio necessitatibus vitae maiores quos illo.",
      p: "   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suntoptio necessitatibus vitae maiores quos illo.",
    },
    {
      h1: "   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suntoptio necessitatibus vitae maiores quos illo.",
      p: "   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suntoptio necessitatibus vitae maiores quos illo.",
    },
    {
      h1: "   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suntoptio necessitatibus vitae maiores quos illo.",
      p: "   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suntoptio necessitatibus vitae maiores quos illo.",
    },
    {
      h1: "   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suntoptio necessitatibus vitae maiores quos illo.",
      p: "   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suntoptio necessitatibus vitae maiores quos illo.",
    },
  ];
  return (
    <div className=" mt-[100px] sm:px-[20px] ">
    
      <div className="items-center mt-[100px] flex gap-[30px]  flex-col">
        {Faq.map((item, index) => (
          <div
            data-aos="fade-left"
            className=" shadow-xl rounded-md p-[1px] bg-gradient-to-b from-blue to-lightblue  sm:h-[225px]   h-contain sm:w-[100%] w-[650px] ">
            <div className="rounded-md px-[20px] py-[20px] sm:py-[38.5px]  sm:px-[15px] relative flex flex-col  text-center  gap-[40px] bg-white overflow-hidden">
              <FaRegComments color="#2C9ED7"   className="absolute w-[100px] h-[100px] z-[-10px] opacity-[0.2] top-[-5px] sm:left-[-15px] sm:top-[2px] left-[-10px]"/>
            <i class="fa-light fa-comments  "></i>
              <div className="flex flex-row sm:mt-[-24px] justify-between items-center">
                <h1 className="font-bold text-textcolor sm:text-[16px] text-[18px]">
                  {item.h1}
                </h1>
              </div>
              <div>
              <p className="text-[15px] sm:text-[14px] px-[30px] text-textcolor">{item.p}</p>
              </div>
             
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Faq;
