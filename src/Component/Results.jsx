import React from "react";
// import result1 from "../Assets/result1.jpg"
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const res = [
  {
    img: "/result1.jpg",
  },
  {
    img: "/result1.jpg",
  },
  {
    img: "/result1.jpg",
  },
  {
    img: "/result1.jpg",
  },
  {
    img: "/result1.jpg",
  },
  {
    img: "/result1.jpg",
  },
  {
    img: "/result1.jpg",
  },
  {
    img: "/result1.jpg",
  },
  {
    img: "/result1.jpg",
  },
];

const Results = () => {
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  const navigate = useNavigate();
  // const handleClick = () => {
  //   navigate(`/image/${encodeURIComponent(res.img)}`);
  // };

  return (
    <div>
      <div className="grid sm:hidden  grid-cols-3 sm:flex sm:flex-col sm:w-[100vh] gap-[30px] mx-[210px]  sm:mx-[140px] mt-[100px]">
        {res.map((item, index) => (
          <div
            data-aos="fade-left"
            className="image w-[400px] sm:w-[70%] sm:h-[350px]  cursor-pointer "
            onClick={() => window.open(`${item.img}`)}>
            <img src={item.img} className="rounded-2xl relative " />
            <p
              className="absolute text-white top-[200px] left-[20px] font-medium "
              onClick={() => window.open(`${item.img}`)}>
              View
            </p>
          </div>
        ))}
      </div>
      <div className="grid sm:block hidden grid-cols-3 sm:flex sm:flex-col  gap-[30px] mx-[210px]  sm:mx-[15%]   mt-[100px]">
        {res.map((item, index) => (
          <div
            data-aos="fade-up"
            className="image w-[400px] sm:w-[100%] sm:h-[450px]  cursor-pointer "
            onClick={() => window.open(`${item.img}`)}>
            <img src={item.img} className="rounded-2xl relative " />
            <p
              className="absolute text-white top-[200px] sm:text-[18px] sm:top-[90%] left-[20px] sm:left-[5%] font-medium "
              onClick={() => window.open(`${item.img}`)}>
              View
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
