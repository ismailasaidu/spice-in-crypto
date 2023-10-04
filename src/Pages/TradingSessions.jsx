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

 

  return (
    <div className="py-[150px] sm:py-0 md:py-[100px] text-textcolor px-[200px] sm:mt-[80px] md:px-[100px] sm:px-[30px]">
      <div className="flex flex-row sm:flex-col md:flex-col justify-between">
        <div className="flex flex-col gap-[20px]">
          <div>
            <h1 className="font-bold text-[24px] sm:text-[28px] ">
              Forex Trading Sessions
            </h1>
          </div>
          <div className="sm:text-[22px]">
            <div className="flex flex-row items-center sm:items-start">
              <p> ✅</p>
              <p>New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
            </div>
            <div className="flex flex-row items-center sm:items-start">
              <p> ✅</p>
              <p>New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
            </div>
            <div className="flex flex-row items-center sm:items-start">
              <p> ✅</p>
              <p>New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
            </div>
            <div className="flex flex-row items-center sm:items-start">
              <p> ✅</p>
              <p>New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
            </div>
          </div>
          <div>
            <h1 className="font-medium text-[18px] sm:text-[28px] underline ">
              Most Active Hours = when two sessions overlap:
            </h1>
          </div>
          <div className="sm:text-[22px]">
            <div className="flex flex-row items-center sm:items-start">
              <p> ✅</p>
              <p>New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
            </div>
            <div className="flex flex-row items-center sm:items-start">
              <p> ✅</p>
              <p>New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
            </div>
            <div className="flex flex-row items-center sm:items-start">
              <p> ✅</p>
              <p>New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
            </div>
          </div>
          <div className="sm:text-[22px]">
            <p>Join The Forex Bulls Community For Free</p>
          </div>
        </div>
        <div>
          <img src={sessions} alt="" width={400} />
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
      <Started icon=" BsPlayFill" text1="GET STARTED"/>
    </div>
  );
};

export default tradingSessions;
