import React from "react";
import peakpx from "../Assets/peakpx.jpg";
import slack from "../Assets/slack.png";
import { Container } from "react-bootstrap";
import { useEffect } from "react";

const details = [
  {
    h1: "Self-Awareness",
    tick: "/slack.png",
    p: "    Understand your own risk tolerance, strengths, and weaknesses as a trader. Knowing your emotional triggers is the first step in managing them effectively.",
    imgSrc: "",
  },
  {
    h1: " Education",
    tick: "/slack.png",
    p: "    Continuously educate yourself about trading strategies, market analysis, and risk management. Knowledge reduces uncertainty and boosts confidence.",
    imgSrc: "",
  },
  {
    h1: " Trading Plan",
    tick: "/slack.png",
    p: "   Develop a comprehensive trading plan that includes entry and exit strategies, risk management rules, and goals. Stick to your plan to avoid impulsive decisions.",
    imgSrc: "",
  },
  {
    h1: "Risk Management",
    tick: "/slack.png",
    p:" Use proper risk management, such as setting stop-loss orders and position sizing, to limit potential losses and protect your capital.",
    imgSrc: "",
  },
  
  {
    h1: "Emotional Control",
    tick: "/slack.png",
    p: "    Learn to manage your emotions like fear and greed. Avoid making impulsive decisions based on emotional reactions.",
    imgSrc: "",
  },
  {
    h1: " Positive Mindset",
    tick: "/slack.png",
    p: "    Cultivate a positive and patient mindset. Accept that losses are part of trading and view them as opportunities to learn and improve. Always think of your next 1000 trades. ",
    imgSrc: "",
  },
  {
    h1: "Trading Journal",
    tick: "/slack.png",
    p: "   Maintain a detailed trading journal to track your trades, emotions, and performance. Analyzing past trades can help you identify patterns and areas for improvement.",
    imgSrc: "",
  },
  {
    h1: "Risk-Reward Ratio",
    tick: "/slack.png",
    p: "  Use a favorable risk-reward ratio in your trades. Ensure that potential profits outweigh potential losses, which can boost your confidence.",
    imgSrc: "",
  },
  {
    h1: " Set Realistic Expectations",
    tick: "/slack.png",
    p: "     Avoid expecting to get rich quickly. Understand that trading is a skill that takes time to develop, and consistent, smaller gains are more sustainable.",
    imgSrc: "",
  },  {
    h1: "Continuous Improvement",
    tick: "/slack.png",
    p: "       Regularly review your trading strategies and adapt to changing market conditions. Keep learning and evolving as a trader.",
    imgSrc: "",
  },  {
    h1: "Avoid Overtrading",
    tick: "/slack.png",
    p: "     Stick to your trading plan and avoid making excessive trades in a short time. Overtrading can lead to emotional exhaustion and poor decision-making.",
    imgSrc: "",
  },
  {
    h1: "Physical Health",
    tick: "/slack.png",
    p: "       Prioritize physical health through exercise, a balanced diet, and adequate sleep. A healthy body can help maintain mental resilience.",
    imgSrc: "",
  },
  {
    h1: "Support System",
    tick: "/slack.png",
    p: "     Connect with fellow traders or seek professional guidance from a mentor or therapist if needed. Sharing experiences and insights can be valuable",
    imgSrc: "",
  },
  {
    h1: "Take Breaks",
    tick: "/slack.png",
    p: "  Step away from the screen when feeling overwhelmed. Short breaks can help you regain focus and prevent impulsive actions.",
    imgSrc: "",
  },
  {
    h1: " Accept Responsibility",
    tick: "/slack.png",
    p: "     Take full responsibility for your trading decisions. Avoid blaming external factors or seeking quick fixes for losses.",
    imgSrc: "",
  },
  
  {
    h1: "Simulated Trading",
    tick: "/slack.png",
    p: "     Practice with a demo account to gain experience and build confidence without risking real money.",
    imgSrc: "",
  },
  
  
  
];

const GrowingAccount = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

 

  return (
    <div className="text-textcolor py-[100px] px-[250px]  md:px-[100px]  sm:px-[40px] sm:pt-[150px]">
      <div className="text-center">
        <h1 className="font-bold text-[26px] sm:text-[18px]">HOW TO IMPROVE YOUR TRADING PSYCHOLOGY. </h1>
        <p className="text-left  sm:text-center sm:text-[18px] sm:mt-[10px]">
        Improving your trading psychology is crucial for long-term success in the financial markets. Here's an extensive guide on how to enhance your trading psychology:
        </p>
      </div>
      <div className=" mt-[30px] sm:mt-[50px]">
        {details.map((item, index) => (
          <div className="flex items-start  gap-[20px] flex-col">
            <h1 className="underline text-center text-[20px] font-bold sm:text-[26px]"> {item.h1}</h1>
            <div className="flex gap-[10px] flex-row">
            <p className="" > ✅</p>
              <p className="text-[18px] sm:text-[18px]">{item.p}</p>
            </div>
            <div>
              <img src={item.imgSrc} alt="" width={400} />
            </div>
          </div>
        ))}
      </div>
      <div className="text-[20px] sm:text-[18px] font-semibold">
        <p>Master your emotions and maintain a rational, disciplined approach to enhance your trading psychology and increase your chances of success in the financial markets.</p>
      </div>

    </div>
  );
};

export default GrowingAccount;
