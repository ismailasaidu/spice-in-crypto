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
     <AnimatedHeader text1="HOW THE PROGRAM WORKS
"/>
          <p className="hide font-medium sm:font-bold sm:text-[15px] md:font-bold text-textcolor font-MT ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
            dolor accusamus ducimus iste rem,<br></br> dolorem voluptas ad
            temporibus vel beatae nam repudiandae harum atque maiores
            dignissimos odio ex quibusdam?<br></br> Omnis sequi ab optio numquam
            nisi voluptate ad repudiandae laboriosam ipsam!
          </p>
          <p className="hide font-medium sm:font-bold sm:text-[15px]  md:font-bold text-textcolor">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
            dolor accusamus ducimus iste rem,<br></br> dolorem voluptas ad
            temporibus vel beatae nam repudiandae harum atque maiores
            dignissimos odio ex quibusdam?<br></br> Omnis sequi ab optio numquam
            nisi voluptate ad repudiandae laboriosam ipsam!
          </p>
        </div>
        <Card />
        <Started icon="BsPlayFill" text1="Get Started"/>

        <Results />
        <AnimatedHeader text1="FREQUENTLY ASKED QUESTIONS"/>
        <Faq />
        <Started icon="BsPlayFill" text1="Get Started" />
      </div>
    </>
  );
};

export default Home;
