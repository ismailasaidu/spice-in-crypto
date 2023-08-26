import React from 'react'
import slack from "../Assets/slack.png"

import { Container } from "react-bootstrap";


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
    return (
      <div className="text-textcolor mx-[200px] flex flex-col gap-[30px] sm:mt-[200px] sm:mx-[50px]">
        <div>
          <h1 className="font-bold text-[28px] text- mt-[100px]  text-center ">
            Types Of Forex Trading
          </h1>
        </div>
        <div className="font-medium">
          <div className="flex gap-[10px] flex-row items-center ">
          <p> ✅</p>
            <p>New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
          </div>
          <div className="flex  gap-[10px] flex-row items-center">
        
            <p> ✅</p>
            <p>New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
          </div>
       
        </div>
        <div>
          <p>Click This Link To Trade With The Best Broker</p>
        </div>
        <div className="flex flex-col   gap-[40px]">
          {typeDetails.map((item, index) => (
            <div className="flex flex-row sm:flex-col gap-[30px] items-center">
              <div className="w-[400px] sm:w-[100%] flex-1">
                <h1 className="underline text-[20px] ">{item.h1}</h1>
                <p className="font-bold">{item.p}</p>
              </div>
  
              <div className="flex flex-[1.5px] border-none">
                <img src={item?.imgSrc} alt="" className='w-[900px] h-[250px] '  />
              </div>
            </div>
          ))}
        </div>
        <Container>
        <div className="ratio ratio-21x9 mt-[100px]">
          <iframe
            className="w-[1000px] sm:w-[100%] h-[500px]"
            src="https://www.youtube.com/embed/_F8MgJ3FVm8"
            title="YouTube video"
            allowFullScreen></iframe>
        </div>
      </Container>
      </div>
    );
  };
  
  export default Trend;
  