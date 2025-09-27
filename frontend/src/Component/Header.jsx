import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/AuthSlice";
import logo from "../Assets/logo.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
  const [show, setShow] = useState(true);
  const [scrolling, setScrolling] = useState(false);

  const cart = useSelector((state) => state.cart.value || []);
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 2000 });

    const handleScroll = () => {
      if (window.scrollY > 50) setScrolling(true);
      else setScrolling(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  const headerList = [
    { p: "HOME", to: "/" },
    { p: "OUR STORY", to: "/ourstory" },
    { p: "ENROLL", to: "/signals" },
    { p: "CONTACT", to: "/physicalclasses" },
    { p: "RESOURCES", to: "/resources" },
  ];

  return (
    <div
      className={`${
        show ? "sm:h-[9.5%]" : "sm:h-[50%]"
      } duration-300 bg-headerwhite overflow-hidden z-[100] shadow-xl px-[90px] md:px-[5%] sm:px-[0px] fixed top-0 w-full`}>
      <div
        className={`header ${
          scrolling ? "scrolling" : ""
        } font-MT flex justify-between md:items-center md:px-[20px] sm:border-b sm:py-[20px] py-[10px] sm:px-[30px] w-full items-center`}>
        <div>
          <Link to="/">
            <img src={logo} width={90} className="sm:w-[70px]" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="flex justify-between items-center w-full md:text-[10px] text-blue font-bold text-[15px] sm:hidden">
          <div className="flex gap-[5%] w-full ml-[30%] md:ml-[12%]">
            {headerList.map((item, index) => (
              <div className="link1" key={index}>
                <Link to={item.to}>
                  <h1 className="md:text-[1em] cursor-pointer md:font-bold hover:text-blue">
                    {item.p}
                  </h1>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex gap-[15%]">
            <button
              className="bg-lightblue text-white w-[80px] h-[30px]"
              onClick={isLoggedIn ? handleLogout : () => navigate("/log")}>
              {isLoggedIn ? "LOGOUT" : "LOGIN"}
            </button>

            <Link to="/cart">
              <div className="relative">
                <BsCart4 color="#0F1231" className="w-[25px] h-[25px]" />
                <div className="absolute bottom-3 left-3 bg-blue rounded-full w-4 h-4">
                  <p className="ml-[5px] text-xs text-white">{cart.length}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex gap-[20px] items-center">
          <Link to="/cart">
            <div className="relative hidden mt-[-5px] sm:block">
              <BsCart4 color="#0F1231" className="w-[25px] h-[25px]" />
              <div className="absolute top-0 left-[15px] bg-blue rounded-full w-[13px] h-[13px]">
                <p className="ml-[4px] mt-[-1px] text-[10px] font-black text-white">
                  {cart.length}
                </p>
              </div>
            </div>
          </Link>

          <AiOutlineMenu
            className="hidden sm:block w-[25px] h-[25px]"
            onClick={() => setShow(!show)}
          />
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`flex flex-col px-[20px] py-[5%] space-y-[14px] z-[100] w-full sm:text-left font-bold text-black ${
          show ? "hidden" : "block"
        }`}>
        {headerList.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            onClick={() => setShow(true)}
            className="px-[10px]">
            <h1 className="cursor-pointer text-[1rem] font-bold">{item.p}</h1>
          </Link>
        ))}

        <button
          className="bg-lightblue w-[100px] h-[30px] mt-2"
          onClick={isLoggedIn ? handleLogout : () => navigate("/log")}>
          {isLoggedIn ? "LOGOUT" : "LOGIN"}
        </button>
      </div>
    </div>
  );
};

export default Header;
