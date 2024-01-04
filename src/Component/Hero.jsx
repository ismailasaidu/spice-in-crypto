import React from "react";
import phone from "../Assets/phone.png";

import { Container } from "react-bootstrap";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Started from "./Started";
import Play from "./Play";
import { Link } from "react-router-dom";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div>
      <div className="bg-[url('./Assets/peakpx.jpg')]  bg-cover bg-center relative  bg-no-repeat h-[1300px] sm:h-[100%] md:h-[800px] py-[80px] sm:px-[30px] sm:pt-[80px] pt-[150px] md:pt-[120px] px-[150px] ">
        <Link to="/signals">
          <div className="text-center mt-[-40px] sm:mt-[60px]">
            <button className="bg-lightblue w-[100px] h-[40px] text-[16px] font-bold text-white rounded-md">
              Join Us
            </button>
          </div>
        </Link>
        <div className="flex flex-row md:flex-col justify-between mt-[40px] sm:mt-0 absolute">
          <div data-aos="fade-right">
            <div className="sm:hidden ">
              <h1 className=" content  text-[34px]  ml-[50px] md:block sm:ml-0 sm:text-[54px] md:ml-0 md:text-[34px]  md:text-left   font-black">
                Trade Smarter, Not Harder!
              </h1>
            </div>
            <div className="hidden sm:block ">
              <h1 className="col ml-[50px] sm:ml-0 pt-[60px] sm:mt-0  sm:text-[30px]  hidden font-black">
                Trade Smarter, Not <br></br>Harder!
              </h1>
            </div>
            <div className="mt-[20px] sm:mt-[30px]    sm:text-[16px] sm:flex sm:flex-col sm:gap-[5px] gap-[15px]">
              <div className="font-bold text-textcolor flex flex-row items-center mt-[30px] sm:mt-0">
                <p className="font-bold text-black sm:hidden block ">
                  Your Journey to Financial Freedom Begins Here!
                </p>
                <p className="font-bold text-black sm:block hidden">
                  Your Journey to Financial Freedom Begins <br></br>Here!
                </p>
              </div>

              <div className="font-bold flex flex-row items-start ">
                {/* <p>.</p> */}
                <p>
                  Knowledge gathered within 7 years <br></br>of trading broken
                  down<br></br> for easy assimilation.{" "}
                </p>
              </div>
              <div className="font-bold flex flex-row items-start ">
                {/* <p>.</p> */}
                <p>Let's get you started on a life changing journey.</p>
              </div>
              {/* <div className="font-bold text-black flex flex-row items-center ">
                <p>.</p>
                <p>time freedom and</p>
              </div>
              <div className="font-bold text-black flex flex-row items-center ">
                <p>.</p>
                <p>the lucrative trading lifestyle.</p>
              </div>
              <div className="font-bold text-black flex flex-row items-center ">
                <p>Let’s get you started on a life changing journey!</p>
              </div> */}
            </div>
          </div>
          <div data-aos="zoom-in-left" className=" md:hidden   sm:hidden">
            <img
              src={phone}
              alt=""
              className="ml-[80px] mt-[-50px] md:hidden sm:hidden"
              width={600}
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
          <div className="ratio ratio-21x9 mt-[500px] md:mt-[300px] sm:mt-[380px] ">
            <iframe
              className="w-[1000px] sm:w-[100%] md:w-[100%] sm:h-[200px]  md:h-[250px]   h-[500px]"
              // src="https://www.youtube.com/embed/_F8MgJ3FVm8"

              src="https://www.youtube.com/embed/2mSBdmjlBc0?si=EWbCAoAIqmN9XP5Z"
              title="YouTube video"
              allowFullScreen></iframe>
          </div>
        </Container>
        <div className="mt-[50px] ">
          <Started text1="ENROLL NOW" />
        </div>
      </div>
      {/* <Route path="description/:ids" element={<ProductDetails/>}/> */}
    </div>

    // <iframe width="853" height="480" src="" title="Live Trade &amp; Analysis" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  );
};

export default Hero;
