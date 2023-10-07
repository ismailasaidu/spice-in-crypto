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
      p: "Sydney Session: This session starts the Forex trading day. It begins at 10:00 PM GMT and ends at 7:00 AM GMT. Major currency pairs involving the Australian and New Zealand Dollars are often active during this session.",
    },
    {
      p: "Tokyo Session: Following the Sydney session, the Tokyo session starts at 11:00 PM GMT and concludes at 8:00 AM GMT. It primarily involves the Japanese Yen and overlaps with the Sydney session, creating liquidity in Asian markets. ",
    },
    {
      p: " London Session: The London session is one of the most significant. It commences at 8:00 AM GMT and ends at 4:00 PM GMT. The Euro (EUR) and British Pound (GBP) are heavily traded during this session. It also overlaps with the Tokyo session for a few hours, resulting in increased trading activity.",
    },
    {
      p: "  New York Session: Starting at 1:00 PM GMT and closing at 10:00 PM GMT, the New York session is another major player in Forex trading. The U.S. Dollar (USD) is the dominant currency during this session. It overlaps with the London session, creating high trading volume.",
    },
  ];

  return (
    <div className="py-[150px] sm:py-0 md:py-[100px] text-textcolor px-[200px] sm:mt-[80px] md:px-[100px] sm:px-[30px]">
      <div className="flex flex-row sm:flex-col md:flex-col gap-[130px] sm:gap-0">
        <div className="flex flex-col gap-[40px]">
          {typeDetails.map((item, index) => (
            <div className="flex flex-row sm:flex-col gap-[30px] items-center">
              <div className="w-[400px] sm:w-[100%] flex-1">
                {/* <h1 className="underline sm:text-[24px] sm:font-bold text-[20px] ">{item.h1}</h1> */}
                <p className="font-bold sm:text-[22px] sm:font-medium">
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
          <p className="font-bold sm:text-[22px] sm:font-medium">NOTE: These sessions represent the main trading hours in the global Forex market. The Crypto <br></br>markets are open 24/7 but it's during these times we get the most volume so it's advised <br></br>to trade during these sessions.</p>
        </div>
      </div>

      <Container>
        <div className="ratio ratio-21x9 mt-[50px]">
          <iframe
            className="w-[1000px] sm:w-[100%] md:w-[100%] md:h-[300px] sm:h-[200px] h-[500px]"
            src="https://www.youtube.com/embed/_F8MgJ3FVm8"
            title="YouTube video"
            allowFullScreen></iframe>
        </div>
      </Container>
      <Started icon=" BsPlayFill" text1="GET STARTED" />
    </div>
  );
};

export default tradingSessions;
