import React from "react";
import slack from "../Assets/slack.png";
import sessions from "../Assets/sessions.jpg";
import { Container } from "react-bootstrap";
import AnimatedHeader from "../Component/AnimatedHeader";
import Started from "../Component/Started";

const tradingSessions = () => {
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, []);

  const typeDetails = [
    {
      p: "The cryptocurrency market operates 24/7. However, there are periods when trading activity is higher due to global market participants. The main trading sessions in the crypto market are:",
    },
    {
      p: "Asian Session: This is when people in Asia, like Japan and South Korea, do a lot of crypto trading. It's usually when their financial markets open.",
    },
    {
      p: " European Session: When European markets open, the crypto market gets busier because of more trading activities. Especially in cities like London.",
    },
    {
      p: " North American Session: This is when trading in the USA and Canada becomes active. It's a big part of the crypto market because of high liquidity. ",
    },
    {
      p: "  Global Continuation: Even after these sessions are closed for the week, crypto trading doesn't stop. People from all around the world keep trading 24/7.",
    },
  ];

  return (
    <div className="py-[150px] sm:py-0 md:py-[100px] text-textcolor px-[200px] sm:mt-[180px] md:px-[100px] sm:px-[30px]">
      <div className="flex flex-row sm:flex-col md:flex-col gap-[130px] sm:gap-0">
     
        
       
        <div className="flex flex-col gap-[40px]">
          {typeDetails.map((item, index) => (
            <div className="flex flex-row sm:flex-col gap-[30px] items-center">
              <div className="w-[400px] sm:w-[100%] flex-1">
            
        
                {/* <h1 className="underline sm:text-[24px] sm:font-bold text-[20px] ">{item.h1}</h1> */}
                <p className="font-bold sm:text-[18px] sm:font-medium">
                  {item.p}
                </p>
              </div>

              {/* <div className="flex flex-[1.5px]">
              <img src={item.imgSrc} alt="" width={900} height={300}  />
            </div> */}
            </div>
          ))}
        </div>
        <div>
          <img src={sessions} alt="" width={400} />
          <p className="font-bold sm:text-[20px] sm:font-medium">
          Remember, the crypto market doesn't have set hours like regular forex or stock markets. It's always open, and trading happens all the time.
          </p>
        </div>
      </div>

      <Container>
        <div className="ratio ratio-21x9 mt-[50px]">
          <iframe
            className="w-[1000px] sm:w-[100%] md:w-[100%] md:h-[300px] sm:h-[200px] h-[500px]"
            // src="https://www.youtube.com/embed/_F8MgJ3FVm8"
            src="https://www.youtube.com/embed/nK8fzdffwYw?si=I0N4cx6eNGA6XYc7" 
            title="YouTube video"
            allowFullScreen></iframe>
        </div>
      </Container>
      <Started icon=" BsPlayFill" text1="GET STARTED" />
    </div>
  );
};

export default tradingSessions;
