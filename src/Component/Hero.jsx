import React, { useState, useEffect } from "react";
import phone from "../Assets/phone.png";
import { Container } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import Started from "./Started";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Hero = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const handleIframeLoad = () => {
    // Hide loader once iframe is fully loaded
    setLoading(false);
  };

  return (
    <div>
      <div className="bg-[url('./Assets/peakpx.jpg')] bg-cover bg-center relative bg-no-repeat h-[1300px] sm:h-[100%] md:h-[800px] py-[80px] sm:px-[30px] sm:pt-[80px] pt-[150px] md:pt-[120px] px-[150px]">
        <Link to="/signals">
          <div className="text-center mt-[-40px] sm:mt-[60px]">
            <button className="bg-lightblue w-[100px] h-[40px] text-[16px] font-bold text-white rounded-md">
              Join Us
            </button>
          </div>
        </Link>

        <div className="flex flex-row md:flex-col justify-between mt-[40px] sm:mt-0 absolute">
          <div data-aos="fade-right">
            <div className="sm:hidden">
              <h1 className="content text-[34px] ml-[50px] md:block sm:ml-0 sm:text-[54px] md:ml-0 md:text-[34px] md:text-left font-black">
                Trade Smarter, Not Harder!
              </h1>
            </div>
            <div className="hidden sm:block">
              <h1 className="col ml-[50px] sm:ml-0 pt-[60px] sm:mt-0 sm:text-[30px] hidden font-black">
                Trade Smarter, Not <br /> Harder!
              </h1>
            </div>

            <div className="mt-[20px] sm:mt-[30px] sm:text-[16px] sm:flex sm:flex-col sm:gap-[5px] gap-[15px]">
              <div className="font-bold text-textcolor flex flex-row items-center mt-[30px] sm:mt-0">
                <p className="font-bold text-black sm:hidden block">
                  Your Journey to Financial Freedom Begins Here!
                </p>
                <p className="font-bold text-black sm:block hidden">
                  Your Journey to Financial Freedom Begins <br /> Here!
                </p>
              </div>

              <div className="font-bold flex flex-row items-start">
                <p>
                  Knowledge gathered within 7 years <br />
                  of trading broken down
                  <br /> for easy assimilation.
                </p>
              </div>
              <div className="font-bold flex flex-row items-start">
                <p>Let's get you started on a life changing journey.</p>
              </div>
            </div>
          </div>

          <div data-aos="zoom-in-left" className="md:hidden sm:hidden">
            <img
              src={phone}
              alt="Phone preview"
              className="ml-[80px] mt-[-50px]"
              width={600}
            />
          </div>
        </div>

        {/* === IFRAME with LOADER === */}
        <Container>
          <div className="relative ratio ratio-21x9 mt-[500px] md:mt-[300px] sm:mt-[380px] flex justify-center items-center">
            {loading && (
              <div className="absolute inset-0 flex justify-center items-center bg-white/70 z-10">
                <ClipLoader color="#007BFF" size={60} />
              </div>
            )}

            <iframe
              className="w-[1000px] sm:w-[100%] md:w-[100%] sm:h-[200px] md:h-[250px] h-[500px]"
              src="https://www.youtube.com/embed/2mSBdmjlBc0?si=EWbCAoAIqmN9XP5Z"
              title="YouTube video"
              allowFullScreen
              onLoad={handleIframeLoad}
            ></iframe>
          </div>
        </Container>

        <div className="mt-[50px]">
          <Started text1="ENROLL NOW" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
