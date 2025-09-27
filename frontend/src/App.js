import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "./Component/Header";
import Footer from "./Component/Footer";

import VerifyEmail from "./Pages/VerifyEmail";
import Home from "./Pages/Home";
import OurStory from "./Pages/OurStory";
import PhysicalClasses from "./Pages/PhysicalClasses";
import Resources from "./Pages/Resources";
import Signals from "./Pages/Signals";
import TradingSessions from "./Pages/TradingSessions";
import Types from "./Pages/Types";
import Trend from "./Pages/Trend";
import GrowingAccount from "./Pages/GrowingAccount";
import Cart from "./Pages/Cart";
import CartDetails from "./Pages/CartDetails";
import Checkout from "./Pages/Checkout";
import Signup from "./Pages/Signup";
import Log from "./Pages/Log";
import ForgetPassword from "./Pages/ForgetPassword";

// Redux actions
import { logIn } from "./redux/AuthSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth?.loggedIn); // optional chaining to prevent errors
  const id = useSelector((state) => state.auth?.id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Restore user from localStorage
  useEffect(() => {
    const storedAccount = JSON.parse(localStorage.getItem("Account"));
    if (storedAccount && storedAccount.loggedIn) {
      dispatch(logIn(storedAccount));
    }
  }, [dispatch]);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // optional: you can customize behavior
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="md:overflow-hidden">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ourstory" element={<OurStory />} />
        <Route path="/physicalclasses" element={<PhysicalClasses />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/signals" element={<Signals />} />
        <Route path="/trading-sessions" element={<TradingSessions />} />
        <Route path="/types" element={<Types />} />
        <Route path="/trend" element={<Trend />} />
        <Route path="/growing-small-account" element={<GrowingAccount />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="description/:id" element={<CartDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/log" element={<Log />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
