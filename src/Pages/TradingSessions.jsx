import React from "react";
import slack from "../Assets/slack.png";
import sessions from "../Assets/sessions.jpg";
import { Container } from "react-bootstrap";

const tradingSessions = () => {
  return (
    <div className="pt-[100px] text-textcolor mx-[250px] sm:mt-[200px] sm:mx-[50px]">
      <div className="flex flex-row sm:flex-col justify-between">
        <div className="flex flex-col gap-[20px]">
          <div>
            <h1 className="font-bold text-[24px] sm:text-[28px] ">
              Forex Trading Sessions
            </h1>
          </div>
          <div className="text-[26px]">
            <div className="flex flex-row items-center">
              <p> ✅</p>
              <p>New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
            </div>
            <div className="flex flex-row items-center">
              <p> ✅</p>
              <p>New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
            </div>
            <div className="flex flex-row items-center">
              <p> ✅</p>
              <p>New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
            </div>
            <div className="flex flex-row items-center">
              <p> ✅</p>
              <p>New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
            </div>
          </div>
          <div>
            <h1 className="font-medium text-[18px] sm:text-[28px] underline ">
              Most Active Hours = when two sessions overlap:
            </h1>
          </div>
          <div className="sm:text-[26px]">
            <div className="flex flex-row items-center">
              <p> ✅</p>
              <p>New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
            </div>
            <div className="flex flex-row items-center">
              <p> ✅</p>
              <p>New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
            </div>
            <div className="flex flex-row items-center">
              <p> ✅</p>
              <p>New York opens at 8:00 am to 5:00 pm EST (EDT)</p>
            </div>
          </div>
          <div className="sm:text-[26px]">
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
            className="w-[1000px] sm:w-[100%] h-[500px]"
            src="https://www.youtube.com/embed/_F8MgJ3FVm8"
            title="YouTube video"
            allowFullScreen></iframe>
        </div>
      </Container>
    </div>
  );
};

export default tradingSessions;
