import React, { useEffect } from "react";
import Hero from "../Component/Hero";
import AOS from "aos";
import "aos/dist/aos.css";
import Card from "../Component/Card";
import Faq from "../Component/Faq";
import Started from "../Component/Started";
import Results from "../Component/Results";
import FancyText from "@carefully-coded/react-text-gradient";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <>
      <div className="md:w-[100%]">
        <Hero />
        <div className="text-center sm:text-[28px]  mt-[100px] sm:px-[100px] md:px-[100px]  flex gap-[30px] flex-col">
          {/* <FancyText
          gradient={{ from: "#F858E0", to: "#77156C", type: "linear" }}
          animateTo={{ from: "#6DEDD0", to: "#7AE23A" }}
          animateDuration={2000}>
          HOW THE PROGRAM WORKS
  </FancyText> */}
          <p className="hide font-medium sm:font-bold md:font-bold text-textcolor font-MT ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
            dolor accusamus ducimus iste rem,<br></br> dolorem voluptas ad
            temporibus vel beatae nam repudiandae harum atque maiores
            dignissimos odio ex quibusdam?<br></br> Omnis sequi ab optio numquam
            nisi voluptate ad repudiandae laboriosam ipsam!
          </p>
          <p className="hide font-medium sm:font-bold  md:font-bold text-textcolor">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
            dolor accusamus ducimus iste rem,<br></br> dolorem voluptas ad
            temporibus vel beatae nam repudiandae harum atque maiores
            dignissimos odio ex quibusdam?<br></br> Omnis sequi ab optio numquam
            nisi voluptate ad repudiandae laboriosam ipsam!
          </p>
        </div>
        <Card />

 
        <Results />
        {/* <Faq /> */}
        <Started/>
      </div>
    </>
  );
};

export default Home;
