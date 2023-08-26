import React from "react";
import slack from "../Assets/slack.png";

const footList = [
  {
    p: "Home",
  },
  {
    p: "Best Broker",
  },
  {
    p: "FXB Community",
  },
  {
    p: "Spice in Crytpo 2.0",
  },
  {
    p: "Signals",
  },
  {
    p: "Resources",
  },
];

const Footer = () => {
  return (
    <div className="mt-[150px] sm:w-[100vh] text-textcolor px-[250px] py-[50px] border-t sm:px-[50px] border-headerwhite h-[470px]">
      <div className="flex flex-rol sm:flex-col sm:gap-[30px] justify-between">
        <div className="flex gap-[30px] sm:text-center   flex-col">
          <h1 className="font-black text-[18px] sm:text-[30px] text-textcolor">
            TRADING DISCLAIMER
          </h1>
          <p className="text-textcolor sm:text-[28px] font-medium ">
            Lorem ipsum dolor sit, amet consectetur <br></br>adipisicing elit.
            Quo saepe accusantium <br></br>dicta, ritatis rerum nisi nihil
            <br></br> ut provident repudiandae?
          </p>
        </div>
        <div className="flex gap-[30px] sm:items-center flex-col">
          <div>
            <h1 className=" font-black text-[18px] sm:text-[30px]">CONTACT US </h1>
          </div>
          <div className="sm:text-center sm:text-[28px] font-medium">
            <p>0808642634</p>
            <p>support@spiceincryto.com</p>
          </div>
        </div>
        <div className="flex gap-[30px] sm:items-center items flex-col">
          <div>
            <h1 className="font-black text-[18px] sm:text-[30px]">KEEP IN TOUCH</h1>
          </div>

          <div className="flex sm:gap-[100px] flex-row">
            <img src={slack} className="w-[34px] h-[44px]" />
            <img src={slack} className="w-[34px] h-[44px]" />
            <img src={slack} alt="" className="w-[34px] h-[44px]" />
            <img src={slack} alt="" className="w-[34px] h-[44px]" />
          </div>
        </div>
      </div>
      <div className="mt-[100px] text-[16px]   flex justify-between px-[50px] border-b border-footer pb-[50px]">
        {footList.map((item, index) => (
          <div className="link px-[5px]">
            <h1 className="  cursor-pointer hover:text-grey">{item.p}</h1>
          </div>
        ))}
      </div>
      <h1 className="text-center text-[14px] sm:h-[100px] sm:text-[18px] font-bold mt-[20px]">
        © 2023 Spice in Crytpo. All rights reserved.
      </h1>
    </div>
  );
};

export default Footer;
