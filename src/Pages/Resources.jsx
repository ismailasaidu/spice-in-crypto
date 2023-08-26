import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsImage } from "react-icons/bs";
import { PiImagesSquareFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const Resources = () => {
  const images = [
    {
      img: "/logo.png",
      p: "Forex Trading Sessions",
      link:"/trading-sessions "
    },
    {
      img: "/logo.png",
      p: "Forex Trading Sessions",
      link:"/types"
    },
    {
      img: "/logo.png",
      p: "Forex Trading Sessions",
      link:"/trend"
    },
    {
      img: "/logo.png",
      p: "Forex Trading Sessions",
      link:"/growing-small-account"
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap sm:flex-col sm:items-center  gap-[20px] justify-center w-[960px] mx-[210px] sm:mx-0 sm:w-[100%] sm:mt-[300px] mt-[150px]">
        {images.map((item, index) => (
          <Link to={item.link}>
          <div
            // data-aos="fade-left"
            className="image w-[400px]  sm:w-[570px] sm:h-[450px] cursor-pointer hover:bg-rescol rounded-2xl   ">
            <img src={item.img} className="rounded-2xl opacity-[1px] bg-rescol " />
            <div className="w-[190px] h-[45px]  relative top-[40%] left-[15%] sm:left-[32%] sm:top-[50%] bg-rescol   border-white border-[1px] border-b-0">
              <p className="text-[16px] text-center py-[10px] text-white">
                {item.p}
              </p>
            </div>
            <div className="absolute left-[115px] sm:top-[45%] sm:left-[45%] z-[110px] top-[75px] px-[5px] py-[5px]">
              <PiImagesSquareFill
                size={30}
                className="  text-white  "
                value={{ color: "", size: "50px" }}
              />
            </div>

            {/* <BsImages
              size={30}
              className="mt-[200px "
              value={{ color: "", size: "50px" }}
            /> */}
          </div>
          </Link>
          
        ))}
      </div>
    </div>
  );
};

export default Resources;
