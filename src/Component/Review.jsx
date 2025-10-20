import React from "react";
import logo from "../Assets/logo.png";
import "react-responsive-carousel/lib/styles/carousel.css";

import { Carousel } from "react-responsive-carousel";

const reviews = [
  {
    thought:
      "  Thank you Spice for the knowledge you've given us, I'm seeing some growth on my small account. Even though it's small, it's progress to me. Thanks again!",
    name: "MOHAMMAD SADIQ",
  },
  {
    thought:
      " Spice, your guidance has really helped me step up my trading game. I'm now able to clearly understand the charts unlike before when I started. Thank you for your support, may God bless you.",
    name: "SAMSON TIMOTHY ",
  },
  {
    thought:
      "  Thank you Spice, I've was able to beat my highest profit in just a day, all thanks to your signals, thanks so much bro!",
    name: "AHMAD AISHA",
  },
  {
    thought:
      "  I've never seen this much growth before in my trading career all thanks to your mentorship. The knowledge you've provided has really gone a long way in my trading. Thanks boss.",
    name: "HAKEEM BAMIDELE",
  },
];

const Review = () => {
  return (
    <div className="mt-[50px]">
      <div className="flex flex-col items-center  gap-[10px]">
        <p className="sm:text-[18px] font-semibold  text-[16px] text-grey">
          Unlocking your Trading Potential
        </p>
        <img src={logo} width={40} />
      </div>
      <Carousel
        showArrows={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
      >
        {reviews.map((item, index) => (
          <div className="flex flex-col gap-[20px] mt-[20px] items-center sm:px-[20px] px-[280px] h-[100%] sm:pb-[50px] pb-[70px]">
            <p className="text-center text-grey  sm:text-[16px] text-[px] ">
              {item.thought}
            </p>
            <h1 className="font-bold sm:text-[20px] text-[24px]">
              {item.name}
            </h1>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Review;
