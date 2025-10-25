import React from "react";
import logo from "../Assets/logo.png";
import peakpx from "../Assets/peakpx.jpg";
import slack from "../Assets/slack.png";
import { useEffect } from "react";
import spice3 from "../Assets/spice4.jpeg";
import {
  FaInstagram,
  FaTelegramPlane,
  FaTwitter,
  FaFacebook,
  FaTiktok,
} from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";

const WYG = [
  { p: "In-depth look at the Crypto markets." },
  { p: "20+ hours of recorded lessons." },
  { p: "Introduction to futures trading. " },
  { p: "Breakdown of my trading strategy and techniques. " },
  { p: "Advanced Technical Analysis breakdown. " },
  { p: "Fundamental Analysis." },
  { p: "Risk Management." },
  { p: "Psychology. " },
  { p: "Free eBooks. " },
  { p: "A community of traders to grow with. " },
  { p: "And many more." },
  // { p: "Physical Training (Kampala trading floor)" },
  // { p: "Physical Training (Kampala trading floor)" },
  // { p: "Physical Training (Kampala trading floor)" },
  // { p: "Physical Training (Kampala trading floor)" },
  // { p: "Physical Training (Kampala trading floor)" },
  // { p: "Physical Training (Kampala trading floor)" },
  // { p: "Physical Training (Kampala trading floor)" },
  // { p: "Physical Training (Kampala trading floor)" },
  // { p: "Physical Training (Kampala trading floor)" },
];

const PhysicalClasses = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const navigateToWhatsApp = () => {
    const phoneNumber = encodeURIComponent("2348081590479");
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex text-textcolor relative flex-col pt-[150px] md:py-[90px] px-[250px] md:px-[50px] sm:mt-[50px] sm:px-[40px] gap-[40px] ">
      <img src={logo} width={100} />
      {/* <h1 className="font-bold text-[24px] sm:text-[18px]">
        SPICE IN CRYPTO PHYSICAL<br></br> CLASSES (ONLY LIMITED TO<br></br> FIRST 20
        PEOPLE)
      </h1> */}
      <img src={spice3} />
      {/* <p className="border-b-footer border-b-[1px] sm:text-[18px] pb-[20px] font-bold text-[18px]">
        What Awaits You In This Masterclass
      </p> */}
      {/* <div className="grid grid-cols-2 sm:grid-cols-1 justify-between pb-[20px] border-b-footer border-b-[1px]">
        {WYG.map((item, index) => (
          <div className="flex  flex-row  items-center mt-[10px] gap-[10px]">
            <p className=""> ✅</p>

            <p className="text-[18px]  sm:text-[14px] sm:font-bold">{item.p}</p>
          </div>
        ))}
      </div>  */}
      <div className="relative">
        {/* <p className="font-bold sm:text-[18px] text-[18px]">
          Instead of $150 you will be getting all these for $120. Claim your
          spot now.
        </p> */}
        <div className="flex sm:gap-[20px] md:gap-[30px] gap-[10px]   flex-col">
          <div
            className="flex flex-row gap-[10px] cursor-pointer"
            onClick={() => {
              window.open("https://t.me/SpiceincryptoAcademy");
            }}
          >
            <FaTelegramPlane size={20} />
            <p> https://t.me/SpiceincryptoAcademy</p>
          </div>
          <div
            className="flex flex-row items-center gap-[10px] cursor-pointer"
            onClick={() => {
              window.open(
                "https://api.whatsapp.com/send/?phone=%2B2349012916019&text&type=phone_number&app_absent=0"
              );
            }}
          >
            <FaWhatsapp size={20} />
            <p className="sm:hidden ">
              https://api.whatsapp.com/send/?phone=%2B2349012916019&text&type=phone_number&app_absent=0
            </p>
            <p className="hidden sm:block">09012916019</p>
          </div>
          <div
            className="flex flex-row items-center gap-[10px] cursor-pointer"
            onClick={() => {
              window.open("https://www.instagram.com/spice_in_crypto_academy/");
            }}
          >
            <FaInstagram size={20} />
            <p className="sm:hidden">
              https://www.instagram.com/spice_in_crypto_academy/
            </p>
            <p>spice_in_crypto_academy</p>
          </div>
          <div
            className="flex flex-row gap-[10px] items-center cursor-pointer"
            onClick={() => {
              window.open(
                "https://twitter.com/spiceincryptoa?s=21&t=Vf939D5KtPrbr660NkKnjw"
              );
            }}
          >
            <FaTwitter size={20} />
            <p className="sm:hidden">
              https://twitter.com/spiceincryptoa?s=21&t=Vf939D5KtPrbr660NkKnjw{" "}
            </p>
            <p className="hidden sm:block">Spice in crypto Academy</p>
          </div>
          <div
            className="flex flex-row gap-[10px] cursor-pointer"
            onClick={() => {
              window.open(
                "https://www.facebook.com/profile.php?id=100088378617770&mibextid=LQQJ4d"
              );
            }}
          >
            <FaFacebook size={20} />
            <p className="sm:hidden ">
              https://www.facebook.com/profile.php?id=100088378617770&mibextid=LQQJ4d{" "}
            </p>
            <p className="hidden sm:block">Spice in Crypto Academy</p>
          </div>
          <div
            className="flex flex-row gap-[10px] cursor-pointer"
            onClick={() => {
              window.open(
                "https://www.tiktok.com/@spiceincryptoacad?_t=8hBdduZGHBd&_r=1"
              );
            }}
          >
            <FaTiktok size={20} />
            <p className="sm:hidden">
              https://www.tiktok.com/@spiceincryptoacad?_t=8hBdduZGHBd&_r=1
            </p>
            <p className="hidden sm:block">@spiceincryptoacad</p>
          </div>
          <div className="sm:mt-[20px] mt-[20px]">
            <button
              className=" bg-lightblue w-[100px] h-[35px]  rounded-xl"
              onClick={navigateToWhatsApp}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalClasses;
