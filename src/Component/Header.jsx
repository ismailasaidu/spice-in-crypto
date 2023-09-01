import React from "react";
import logo from "../Assets/logo.png";
import { useState } from "react";
import { useEffect } from "react";
import hamburger from "../Assets/hamburger.png";
import { AiOutlineMenu } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";

import { useDispatch} from "react-redux";
import { authSlice } from "../redux/AuthSlice";

const Header = () => {
  const [scrolling, setScrolling] = useState(false);
  const [open, setopen] = useState(true);
  const [show, setshow] = useState(true);
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  const cart = useSelector((item) => {
    return item.cart.value;
  });
const dispatch = useDispatch()
 const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("Account");
    dispatch(logOut())
    navigate("/")
  };

  const {logIn, logOut} = authSlice.actions;
  const isLoggedIn = useSelector(state => state.auth.loggedIn)
  const headerList = [
    {
      p: "HOME",
      to: "/",
    },
   
    {
      p: "OUR STORY",
      to: "/ourstory",
    },
    { p: "SIGNALS", to: "/signals" },
    { p: "PHYSICAL CLASSES", to: "/physicalclasses" },
    { p: "RESOURCES", to: "/resources" },
  ];

  return (
    <div
      className={`${
        show ? "sm:h-[80px]" : "sm:h-[42%vh]"
      }  bg-headerwhite overflow-hidden z-[100]     shadow-xl sm:duration-800 sm:ease-in px-[120px]  md:px-0 sm:px-[0px] w-[100%] fixed top-0`}>
      <div
        className={`header ${
          scrolling ? "scrolling" : ""
        }  font-MT  flex justify-between md:items-center md:px-[50px] md:overflow-hidden  sm:border-b sm:py-[20px]  w-[100%] py-[10px] items-center   sm:px-[30px] `}>
        <div>
          <Link to="/">
            <img src={logo} width={90} className="sm:w-[70px]" />
          </Link>
        </div>
        <div className="flex  items-center ml-[170px] gap-[30px]  md:gap-[20px] md:ml-[20px] md:text-[10px] text-blue font-bold text-[15px] sm:hidden">
          {headerList.map((item, index) => (
            <div className="link1 px-[10px] ">
              <Link to={item?.to} key={index}>
                <h1 className=" md:text-[12px]  cursor-pointer md:font-bold hover:text-blue">
                  {item.p}
                </h1>
              </Link>
            </div>
          ))}
          <Link to="/log">
          <button className="bg-lightblue text-white w-[80px] h-[30px]">
       {isLoggedIn ?<>
   <Link to="/">
   <h1  className=""onClick={logout} >LOGOUT</h1>
   </Link>

   
     
       </>:<>
       <Link to="/log">
       <h1 >LOGIN</h1>
       </Link>
      
       
       </>

       }
          </button>
          </Link>
          
          <div className="">
            <Link to="/cart">
              <div className="relative">
                <BsCart4 color="#0F1231" className="w-[25px] h-[25px]" />
                <div className="absolute bottom-3 left-3 bg-blue rounded-full w-4 h-4 ">
                  <p className="ml-[5px] text-xs  text-white">{cart.length}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex gap-[20px] items-center">
         
          
            <Link to="/cart">
              <div className="relative hidden mt-[-5px] sm:block">
                <BsCart4 color="#0F1231"  className="w-[25px] h-[25px]" />
                <div className="absolute top-0 left-[15px] bg-blue rounded-full w-[13px] h-[13px]">
                  <p className="ml-[4px] mt-[-1px] text-[10px] font-black text-white">{cart.length}</p>
                </div>
              </div>
            </Link>
         
          <AiOutlineMenu
            className="hidden   sm:block w-[25px] h-[25px]"
            onClick={() => setshow(!show)}
          />
        </div>
      </div>
      <div className=" flex flex-col  px-[20px] py-[20px]  space-y-[13px]  z-[100] w-[100%] hidden sm:block  text-black font-bold  sm:text-left">
        {headerList.map((item, index) => (
          <div className={`${show ? "hidden" : "block"}  px-[10px]  `}>
            <Link to={item?.to} key={index} onClick={() => setshow(!show)}>
              <h1 className="cursor-pointer text-[14px] font-bold">{item.p}</h1>
            </Link>
          </div>
        ))}

        <div className="flex items-enter  justify-center ">
          <button className=" bg-lightblue w-[100px]">LOGIN</button>
          <button className=" bg-blue">LOGOUT</button>
        </div>
      </div>
    
    </div>
  );
};

export default Header;
