import React from "react";
import logo from "../Assets/logo.png";
import { useEffect } from "react";
import spice1 from "../Assets/spice1.jpeg";
import ScrollToTop from "../Component/ScrollToTop";
const OurStory = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const navigateToWhatsApp = () => {
    const phoneNumber = encodeURIComponent("2349012916019");
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="px-[200px] pt-[150px] text-textcolor sm:px-[50px] md:px-[50px] sm:pt-[150px] ">
      <ScrollToTop />
      <div className="flex justify-center">
        <img src={spice1} width={800} />
      </div>
      <div className="text-center mt-[50px]">
        <h1 className="font-bold text-[18px] sm:text-[18px] underline">
          ABOUT ME
        </h1>
      </div>
      <div className="flex gap-[20px] justify-center mt-[20px] sm:mt-[40px] flex-col items-center">
        <div className="flex gap-[10px] flex-col px-[150px] sm:px-0 md:px-0 ">
          <p className="font-medium sm:text-[14px]">
            Meet our visionary founder Mudanshir Isah popularly known as SPICE.
            He's not just an entrepreneur, he's a beast in the Crypto markets
            with 7 years of experience, a profitable trader, and a self-made
            success story.
          </p>
          <p className="font-medium sm:text-[14px]">
            What sets SPICE apart is his exceptional determination and
            self-taught expertise. He didn't follow the conventional path.
            Instead, he embraced the challenges, going "ghost-mode" for a whole
            year to perfect his unique trading strategy.
          </p>
          <p className="font-medium sm:text-[14px]">
            SPICE's passion for crypto trading didn't stop at his personal
            success. He has shared his wisdom with over 7000 students, both
            online and offline, creating a thriving community of Crypto Traders.
            His commitment to empowering others to navigate the Crypto markets
            is at the heart of his Academy.
          </p>
          <p className="font-medium sm:text-[14px]">
            Join us on this exciting journey into the world of crypto trading,
            guided by the wisdom and experience of SPICE himself. It's for
            everybody! Explore our courses, connect with our community, and let
            us guide your path to success in trading!
          </p>
          <button
            className=" bg-lightblue w-[100px] h-[35px] mt-[30px] sm:mt-0 rounded-xl"
            onClick={navigateToWhatsApp}
          >
            Sign up
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default OurStory;
