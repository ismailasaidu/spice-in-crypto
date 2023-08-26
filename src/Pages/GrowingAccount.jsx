import React from "react";
import peakpx from "../Assets/peakpx.jpg";
import slack from "../Assets/slack.png";
import { Container } from "react-bootstrap";

const details = [
  {
    h1: "Trade with the trend",
    tick: "/slack.png",
    p: "The trader's goal is to capture the trend, and when trading on a small trading account, it is ideal to find pairs that can run for some good moves and bring you excellent profits.",
    imgSrc: "",
  },
  {
    h1: "Trade with the trend",
    tick: "/slack.png",
    p: "The trader's goal is to capture the trend, and when trading on a small trading account, it is ideal to find pairs that can run for some good moves and bring you excellent profits.",
    imgSrc: "",
  },
  {
    h1: "Trade with the trend",
    tick: "/slack.png",
    p: "The trader's goal is to capture the trend, and when trading on a small trading account, it is ideal to find pairs that can run for some good moves and bring you excellent profits.",
    imgSrc: "",
  },
  
];

const GrowingAccount = () => {
  return (
    <div className="text-textcolor mt-[100px] mx-[250px] sm:mx-[100px] sm:mt-[300px]">
      <div className="text-center">
        <h1 className="font-bold text-[26px] sm:text-[28px]">GROWING A SMALL FOREX ACCOUNT</h1>
        <p className="text-left  sm:text-center sm:text-[26px]">
          Trading on small forex accounts can always be so tricky, but again
          with the right approach some traders are able to trade and make money.
          Here’s how;
        </p>
      </div>
      <div className=" mt-[30px] sm:mt-[50px]">
        {details.map((item, index) => (
          <div className="flex items-center  gap-[20px] flex-col">
            <h1 className="underline text-center sm:text-[28px]"> {item.h1}</h1>
            <div className="flex gap-[10px] flex-row">
            <p className="" > ✅</p>
              <p className="text-[26px]">{item.p}</p>
            </div>
            <div>
              <img src={item.imgSrc} alt="" width={400} />
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

export default GrowingAccount;
