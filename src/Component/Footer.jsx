import React from "react";
import slack from "../Assets/slack.png";
import {FaInstagram, FaTelegramPlane, FaTwitter }from "react-icons/fa"
import {FaWhatsapp} from "react-icons/fa"
import { useNavigate } from "react-router-dom";


const footList = [
  {
    p: "Home",
  },
  {
    p: "Best Broker",
  },
  {
    p: "SIC Community",
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
  const navigate = useNavigate()
  return (
    <div className="mt-[150px] sm:mt-[100px]  text-textcolor px-[250px] md:px-0  py-[50px]  border-t  border-headerwhite h-[470px] sm:h-[750px] md:h-[700px]">
      <div className="flex flex-rol sm:flex-col md:grid md:justify-center  sm:gap-[30px] md:gap-[40px] justify-between">
        <div className="flex gap-[30px] sm:text-center md:text-center sm:px-[10px] flex-col">
          <h1 className="font-black text-[18px] sm:text-[20px] text-textcolor">
            TRADING DISCLAIMER
          </h1>
          <p className="text-textcolor md:hidden sm:text-[10px]  font-medium  ">
          Remember to always trade what<br></br> you can afford to loose
          </p>
          <p className="text-textcolor hidden md:block sm:text-[16px] text-center font-medium  ">
          Remember to always trade what you can afford to loose
          </p>
        </div>
        <div className="flex gap-[30px] md:gap-[15px] md:text-center sm:items-center flex-col">
          <div>
            <h1 className=" font-black text-[18px] sm:text-[20px]">
              CONTACT US{" "}
            </h1>
          </div>
          <div className="sm:text-center sm:text-[16px] font-medium">
            <p>09012916019</p>
            <p>spiceincryptoacademy@gmail.com</p>
          </div>
        </div>
        <div className="flex gap-[30px] md:gap-[30px] md:text-center md:items-center sm:items-center items flex-col">
          <div>
            <h1 className="font-black text-[18px] sm:text-[20px]">
              KEEP IN TOUCH
            </h1>
          </div>

          <div className="flex sm:gap-[30px] md:gap-[30px] justify-between items-center flex-row">
          <FaTelegramPlane size={25}   onClick={() => {
                  window.open(
                    "https://t.me/SpiceincryptoAcademy"
                  );
                }}/>
          <FaWhatsapp size={25}  onClick={() => {
                  window.open(
                    "https://api.whatsapp.com/send/?phone=%2B2349012916019&text&type=phone_number&app_absent=0"
                  );
                }}/>
          <FaInstagram size={25} onClick={() => {
                  window.open(
               "https://www.instagram.com/spice_in_crypto_academy/"
                  );
                }} />
          <FaTwitter size={25}  onClick={() => {
                  window.open(
                    "https://twitter.com/spiceincryptoa?s=21&t=Vf939D5KtPrbr660NkKnjw"
                  );
                }}/>
          </div>
        </div>
      </div>
      <div className="mt-[100px] sm:mt-[60px] text-[16px] md:mx-[70px] justify-between md:justify-between md:px-0  sm:px-[20px] sm:mx-0 sm:gap-[10px] flex sm:grid sm:grid-cols-2 place-items-center px-[50px] sm:justify-between  ">
        {footList.map((item, index) => (
          <div className="link px-[5px]">
            <h1 className="  cursor-pointer hover:text-grey">{item.p}</h1>
          </div>
        ))}
      </div>
      <h1 className="text-center text-[14px] sm:h-[100px] sm:text-[12px] sm:mx-[40px] md:mx-[40px]  border-t pt-[30px] border-footer font-bold mt-[40px]">
        © 2023 Spice in Crytpo. All rights reserved.
      </h1>
    </div>
  );
};

export default Footer;
