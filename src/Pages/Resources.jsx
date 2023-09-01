import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsImage } from "react-icons/bs";
import { PiImagesSquareFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Resources = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const images = [
    {
      img: "/logo.png",
      p: "Forex Trading Sessions",
      link: "/trading-sessions ",
    },
    {
      img: "/logo.png",
      p: "Forex Trading Sessions",
      link: "/types",
    },
    {
      img: "/logo.png",
      p: "Forex Trading Sessions",
      link: "/trend",
    },
    {
      img: "/logo.png",
      p: "Forex Trading Sessions",
      link: "/growing-small-account",
    },
  ];

  return (
    <div>
      <div className=" text-center flex items-center gap-[30px] flex-col pt-[80px] sm:py-[120px]">
        <div>
          <h1 className=" text-[34px] sm:text-[28px] text-textcolor text-MT font-bold">
            Resources
          </h1>
        </div>

        <div className="w-[80px] h-[3px]  bg-lightblue"></div>
      </div>
      <div className="flex  flex-wrap sm:grid sm:grid-cols-1 sm:gap-[30px] sm:place-items-center md:place-items-center md:grid md:grid-cols-2  gap-[20px] md:gap-0 justify-center w-[960px] mx-[210px] sm:mx-0  md:px-[100px] md:mx-[5px] sm:w-[100%]  md:w-[100%] sm:mt-[-80px] mt-[30px]">
        {images.map((item, index) => (
          <Link to={item.link}>
            <div
              // data-aos="fade-left"
              className="image w-[300px]   sm:w-[300px] sm:h-[270px] cursor-pointer hover:bg-rescol rounded-2xl   ">
              <img
                src={item.img}
                className="rounded-2xl opacity-[1px] bg-rescol "
              />
              <div className="w-[190px] h-[45px]  relative top-[40%] left-[13%] sm:left-[16%] md:left-[13%] sm:top-[45%] bg-rescol   border-white border-[1px] border-b-0">
                <p className="text-[16px] text-center py-[10px] text-white">
                  {item.p}
                </p>
              </div>
              <div className="absolute left-[115px] sm:top-[38%] sm:left-[42%] z-[110px] top-[75px] px-[5px] py-[5px]">
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
