import React from "react";

const AnimatedHeader = ({text1 ,text2, text3}) => {
  return (
    <div className=" text-center flex items-center gap-[40px] sm:mx-[5px] flex-col mt-[50px]">
      <div>
      <h1 className="content text-[30px] sm:text-[26px] font-bold">
        {text1} 
      </h1>
     
      </div>
 
      <div className="w-[80px] h-[3px]  bg-anime"></div>
    </div>
  );
};

export default AnimatedHeader;
