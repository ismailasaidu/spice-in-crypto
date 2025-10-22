import React, { useState, useEffect } from "react";
import logo from "../Assets/logo.png";
import { AiOutlineMenu } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/AuthSlice";
import { listenToCart } from "../redux/CartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [show, setShow] = useState(true);

  const cartItems = useSelector((state) => state.cart.value || []);
  const isLoggedIn = useSelector((state) => state.auth?.loggedIn || false);
  const accountId = useSelector((state) => state.auth?.id || null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  // Real-time cart sync
  useEffect(() => {
    if (isLoggedIn && accountId) {
      dispatch(listenToCart(accountId));
    }
  }, [isLoggedIn, accountId, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("Account");
    dispatch(logout());
    toast.info("You have successfully logged out!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    navigate("/");
  };

  const headerList = [
    { p: "HOME", to: "/" },
    { p: "OUR STORY", to: "/ourstory" },
    { p: "SIGNAL", to: "/signals" },
    { p: "CONTACT", to: "/contact" },
    { p: "MENTORSHIP", to: "/mentorship" },
  ];

  return (
    <div
      className={`${
        show ? "sm:h-[9.5%]" : "sm:h-[50%]"
      } duration-300 bg-headerwhite overflow-hidden z-[100] shadow-xl sm:ease-in px-[90px] items-center md:px-[5%] sm:px-[0px] w-[100%] fixed top-0`}
    >
      <div
        className={`header font-MT flex justify-between md:items-center md:px-[20px] md:overflow-hidden sm:border-b sm:py-[20px] w-[100%] py-[10px] items-center sm:px-[30px]`}
      >
        {/* Logo */}
        <div>
          <Link to="/">
            <img src={logo} width={90} className="sm:w-[70px]" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="flex justify-between items-center w-[100%] md:text-[10px] text-blue font-bold text-[15px] sm:hidden">
          <div className="flex gap-[5%] w-[100%] ml-[30%] md:ml-[12%]">
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

          {/* Login / Cart */}
          <div className="flex gap-[15%]">
            <div>
              <button className="bg-lightblue text-white w-[80px] h-[30px]">
                {isLoggedIn ? (
                  <h1 onClick={handleLogout} className="cursor-pointer">
                    LOGOUT
                  </h1>
                ) : (
                  <Link to="/login">
                    <h1>LOGIN</h1>
                  </Link>
                )}
              </button>
            </div>

            <div>
              <Link to="/cart">
                <div className="relative">
                  <BsCart4 color="#0F1231" className="w-[25px] h-[25px]" />
                  <div className="absolute bottom-3 left-3 bg-blue rounded-full w-4 h-4">
                    <p className="ml-[5px] text-xs text-white">
                      {cartItems.length}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Cart & Menu */}
        <div className="flex gap-[20px] items-center">
          <Link to="/cart">
            <div className="relative hidden mt-[-5px] sm:block">
              <BsCart4 color="#0F1231" className="w-[25px] h-[25px]" />
              <div className="absolute top-0 left-[15px] bg-blue rounded-full w-[13px] h-[13px]">
                <p className="ml-[4px] mt-[-1px] text-[10px] font-black text-white">
                  {cartItems.length}
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

      {/* Mobile Menu */}
      <div className="flex flex-col px-[20px] py-[5%] space-y-[14px] z-[100] w-[100%] hidden sm:block text-black font-bold sm:text-left">
        {headerList.map((item, index) => (
          <div className="px-[10px]" key={index}>
            <Link to={item.to} onClick={() => setShow(!show)}>
              <h1 className="cursor-pointer text-[1rem] font-bold">{item.p}</h1>
            </Link>
          </div>
        ))}

        <div
          className="flex items-center justify-center"
          onClick={() => setShow(!show)}
        >
          <button className="bg-lightblue w-[100px] h-[30px]">
            {isLoggedIn ? (
              <h1 onClick={handleLogout} className="cursor-pointer">
                LOGOUT
              </h1>
            ) : (
              <Link to="/login">
                <h1>LOGIN</h1>
              </Link>
            )}
          </button>
        </div>
      </div>

      {/* Toast Container */}
    </div>
  );
};

export default Header;
