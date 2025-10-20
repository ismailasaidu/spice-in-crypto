import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Component/Header";
import Footer from "./Component/Footer";

import Home from "./Pages/Home";
import OurStory from "./Pages/OurStory";
import Contact from "./Pages/Contact.jsx"
import Signals from "./Pages/Signals";
import TradingSessions from "./Pages/TradingSessions";
import Types from "./Pages/Types";
import Trend from "./Pages/Trend";
import GrowingAccount from "./Pages/GrowingAccount";
import Cart from "./Pages/Cart";
import CartDetails from "./Pages/CartDetails";
import Mentorship from "./Pages/Mentorshippage";
import Log from "./Pages/Log";
import Signup from "./Pages/Signup";
import ForgetPassword from "./Pages/ForgetPassword";
import PageNotFound from "./Pages/PageNotFound";
import CheckoutSuccess from "./Component/CheckoutSuccess";
import Checkout from "./Pages/Checkout";

import { login } from "./redux/AuthSlice";
import ScrollToTop from "./Component/ScrollToTop";

function App() {
  const dispatch = useDispatch();

  // Check if user is logged in on page load
  useEffect(() => {
    const savedAccount = JSON.parse(localStorage.getItem("Account"));
    if (savedAccount?.loggedIn) {
      dispatch(
        login({
          id: savedAccount.id,
          accountId: savedAccount.accountId,
        })
      );
    }
  }, [dispatch]);

  return (
    <div className="md:overflow-hidden">
      <Header />
      
      {/* Scroll to top on route change */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/ourstory" element={<OurStory />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/signals" element={<Signals />} />
        <Route path="/trading-sessions" element={<TradingSessions />} />
        <Route path="/types" element={<Types />} />
        <Route path="/trend" element={<Trend />} />
        <Route path="/growing-small-account" element={<GrowingAccount />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="description/:id" element={<CartDetails />} />
        <Route path="/login" element={<Log />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="*" element={<PageNotFound />} />
  
      </Routes>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
