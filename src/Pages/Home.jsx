import React, { useEffect } from "react";
import Hero from "../Component/Hero";
import AOS from "aos";
import "aos/dist/aos.css";
import Card from "../Component/Card";
import Faq from "../Component/Faq";
import Started from "../Component/Started";
import Results from "../Component/Results";
import FancyText from "@carefully-coded/react-text-gradient";
import AnimatedHeader from "../Component/AnimatedHeader";
import Review from "../Component/Review";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="md:w-[100%]">
        <Hero />
        <div className="text-center sm:text-[28px]  pt-[50px] sm:px-[30px] md:px-[100px]  flex gap-[30px] flex-col">
          <AnimatedHeader
            text1="WHAT AWAITS YOU IN THIS MASTERCLASS
"
          />
          <p className="hide sm:font-bold  font-semibold sm:text-[15px] text-[18px] md:font-bold text-textcolor font-MT ">
            • In-depth look at the Crypto markets.<br></br>• 20+ hours of
            recorded lessons.<br></br>• Introduction to futures trading.{" "}
            <br></br>• Breakdown of my trading strategy and techniques.{" "}
            <br></br>• Advanced Technical Analysis breakdown.
          </p>
          <p className="hide  font-semibold sm:font-bold sm:text-[15px] text-[18px] md:font-bold text-textcolor">
            • Fundamental Analysis.<br></br>• Risk Management.<br></br>•
            Psychology. <br></br>• Free eBooks. <br></br>• A community of
            traders to grow with. <br></br>• And many more.
          </p>
        </div>
        <Card />
        <Started icon="BsPlayFill" text1="Get Started" />

        <Results />
        <AnimatedHeader text1="REVIEWS" />
        {/* <Faq /> */}
        <Review />
        <Started icon="BsPlayFill" text1="Get Started" />
      </div>
    </>
  );
};

export default Home;
