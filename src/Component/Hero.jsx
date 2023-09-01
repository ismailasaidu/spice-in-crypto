import React from "react";
import phone from "../Assets/phone.png";

import { Container } from "react-bootstrap";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Started from "./Started";
import Play from "./Play";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div>
      <div className="bg-[url('./Assets/peakpx.jpg')]  bg-cover bg-center relative  bg-no-repeat h-[1300px] sm:h-[800px] md:h-[800px] py-[80px] sm:px-[40px] sm:pt-[130px] pt-[150px] md:pt-[120px] px-[150px] ">
        <div className="flex flex-row md:flex-col justify-between  absolute">
          <div data-aos="fade-right">
            <div className="sm:hidden ">
              <h1 className=" content  text-[34px]  ml-[50px] md:block sm:ml-0 sm:text-[54px] md:ml-0 md:text-[34px]  md:text-left   font-black">
                Learn To Trade Like A Pro
              </h1>
            </div>
            <div className="hidden sm:block ">
              <h1 className="col ml-[50px] sm:ml-0   sm:text-[30px]  hidden font-black">
                Learn To Trade Like<br></br> A Pro
              </h1>
            </div>
            <div className="mt-[20px] sm:mt-[30px] sm:text-center sm:text-[14px] sm:flex sm:flex-col gap-[15px]">
              <div className="font-bold text-textcolor flex flex-row items-center ">
                <p className="font-bold text-black">You are one step from</p>
              </div>

              <div className="font-bold flex flex-row items-center ">
                <p>.</p>
                <p>financial freedom</p>
              </div>
              <div className="font-bold text-black flex flex-row items-center ">
                <p>.</p>
                <p>time freedom and</p>
              </div>
              <div className="font-bold text-black flex flex-row items-center ">
                <p>.</p>
                <p>the lucrative trading lifestyle.</p>
              </div>
              <div className="font-bold text-black flex flex-row items-center ">
                <p>Let’s get you started on a life changing journey!</p>
              </div>
            </div>
          </div>
          <div data-aos="zoom-in-left" className=" md:hidden   sm:hidden">
            <img
              src={phone}
              alt=""
              className="ml-[100px] md:hidden sm:hidden"
              width={400}
            />
          </div>
        </div>

        {/* <Container className="">
          <div className="ratio ratio-21x9 mt-[500px] bg-blue md:hidden md:mt-[250px] sm:mt-[630px] ">
            <iframe
              className="w-[1000px] sm:w-[100%] md: md:h-[300px] sm:h-[400px] h-[500px]"
              src="https://www.youtube.com/embed/_F8MgJ3FVm8"
              title="YouTube video"
              allowFullScreen></iframe>
          </div>
        </Container> */}
        <Container>
          <div className="ratio ratio-21x9 mt-[500px] md:mt-[300px] sm:mt-[320px] ">
            <iframe
              className="w-[1000px] sm:w-[100%] md:w-[100%] sm:h-[200px]  md:h-[250px]   h-[500px]"
              src="https://www.youtube.com/embed/_F8MgJ3FVm8"
              title="YouTube video"
              allowFullScreen></iframe>
          </div>
        </Container>
        <div className="mt-[50px] ">
        <Started  text1="ENROLL NOW" />
        </div>
   
      </div>
      {/* <Route path="description/:ids" element={<ProductDetails/>}/> */}
    </div>

    // <iframe width="853" height="480" src="" title="Live Trade &amp; Analysis" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  );
};

export default Hero;