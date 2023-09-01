import React from "react";
import logo from "../Assets/logo.png";
import { useEffect } from "react";



const OurStory = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

 

  return (
    
    <div className="px-[200px] pt-[150px] text-textcolor sm:px-[50px] md:px-[50px] sm:pt-[150px] ">
      <div className="text-center">
        <h1 className="font-bold text-[18px] sm:text-[18px]">My Name Is Olamide</h1>
        <h1 className="font-bold text-[18px] sm:text-[14px]">
          and am about to share a story of how I dropped out of university and
          started full time day trading!
        </h1>
      </div>
      <div className="flex gap-[20px] justify-center mt-[20px] sm:mt-[40px] flex-col items-center">
        <div className="flex gap-[10px] flex-col">
          <h1 className="underline font-bold sm:text-[18px]">Back to where it starts!</h1>
          <p className="font-medium sm:text-[14px]">
            Whole story starts from Kasese, a district in the Western<br></br>{" "}
            side of Uganda! Born to Christian parents with about 7 siblings!
            Surely, with<br></br> such a big family and none of my parents was
            employed,<br></br>
            it was a such a hard time, too hard to even get food on the table on
            some days.
          </p>
        </div>
        <div className="flex gap-[10px] flex-col">
          <h1 className="underline font-bold sm:text-[18px]">Bad days</h1>
          <p className="font-medium sm:text-[14px]">
            Whole story starts from Kasese, a district in the Western<br></br>{" "}
            side of Uganda! Born to Christian parents with about 7 siblings!
            Surely, with<br></br> such a big family and none of my parents was
            employed,<br></br>
            it was a such a hard time, too hard to even get food on the table on
            some days.
          </p>
        </div>
        <div className="flex gap-[10px] flex-col">
          <h1 className="underline font-bold sm:text-[18px]">The Start</h1>
          <p className="font-medium sm:text-[14px]">
            Whole story starts from Kasese, a district in the Western<br></br>{" "}
            side of Uganda! Born to Christian parents with about 7 siblings!
            Surely, with<br></br> such a big family and none of my parents was
            employed,<br></br>
            it was a such a hard time, too hard to even get food on the table on
            some days.
          </p>
        </div>
        <div className="flex gap-[10px] flex-col ">
          <img src={logo} alt="" width={500} />
        </div>
        <div className="flex gap-[10px] flex-col">
          <h1 className="underline font-bold sm:text-[18px]">Failed Business</h1>
          <p className="font-medium sm:text-[14px]">
            Whole story starts from Kasese, a district in the Western<br></br>{" "}
            side of Uganda! Born to Christian parents with about 7 siblings!
            Surely, with<br></br> such a big family and none of my parents was
            employed,<br></br>
            it was a such a hard time, too hard to even get food on the table on
            some days.
          </p>
        </div>
        <div className="flex gap-[10px] flex-col">
          <h1 className="underline font-bold sm:text-[18px]">Process of Learning</h1>
          <p className="font-medium sm:text-[14px]">
            Whole story starts from Kasese, a district in the Western<br></br>{" "}
            side of Uganda! Born to Christian parents with about 7 siblings!
            Surely, with<br></br> such a big family and none of my parents was
            employed,<br></br>
            it was a such a hard time, too hard to even get food on the table on
            some days.
          </p>
        </div>
        <div className="flex gap-[10px] flex-col">
          <h1 className="underline font-bold sm:text-[18px]">The BreakThrough!</h1>
          <p className="font-medium sm:text-[14px]">
            Whole story starts from Kasese, a district in the Western<br></br>{" "}
            side of Uganda! Born to Christian parents with about 7 siblings!
            Surely, with<br></br> such a big family and none of my parents was
            employed,<br></br>
            it was a such a hard time, too hard to even get food on the table on
            some days.
          </p>
        </div>
        <div className="flex gap-[10px] flex-col ">
          <img src={logo} alt="" width={500} />
        </div>
        <div className="flex gap-[10px] flex-col">
          <h1 className="underline font-bold sm:text-[18px]">The Start Of Spice In Crypto Academy</h1>
          <p className="font-medium sm:text-[16px]">
            Whole story starts from Kasese, a district in the Western<br></br>{" "}
            side of Uganda! Born to Christian parents with about 7 siblings!
            Surely, with<br></br> such a big family and none of my parents was
            employed,<br></br>
            it was a such a hard time, too hard to even get food on the table on
            some days.
          </p>
        </div>
        <div className="flex gap-[10px] flex-col ">
          <img src={logo} alt="" width={500} />
        </div>
        <div className="flex gap-[10px] flex-col">
          <h1 className="underline font-bold sm:text-[ 18px]">Company Vision</h1>
          <p className="font-medium sm:text-[14px]">
            Whole story starts from Kasese, a district in the Western<br></br>{" "}
            side of Uganda! Born to Christian parents with about 7 siblings!
            Surely, with<br></br> such a big family and none of my parents was
            employed,<br></br>
            it was a such a hard time, too hard to even get food on the table on
            some days.
          </p>
        </div>
        <div className="flex gap-[10px] flex-col">
          <h1 className="underline font-bold sm:text-[18px]">The Final Deal</h1>
          <p className="font-medium sm:text-[14px]">
            Whole story starts from Kasese, a district in the Western<br></br>{" "}
            side of Uganda! Born to Christian parents with about 7 siblings!
            Surely, with<br></br> such a big family and none of my parents was
            employed,<br></br>
            it was a such a hard time, too hard to even get food on the table on
            some days.
          </p>
        </div>
        <div className="flex gap-[10px] flex-col ">
          <img src={logo} alt="" width={500} />
        </div>
      </div>
    </div>
  );
};

export default OurStory;
