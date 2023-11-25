import Header from "./Component/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import OurStory from "./Pages/OurStory";
import PhysicalClasses from "./Pages/PhysicalClasses";
import Resources from "./Pages/Resources";
import Signals from "./Pages/Signals";
import Footer from "./Component/Footer";
import "@stripe/stripe-js";
import TradingSessions from "./Pages/TradingSessions";
import Types from "./Pages/Types";
import Trend from "./Pages/Trend";
import GrowingAccount from "./Pages/GrowingAccount";
import { useEffect } from "react";
import Cart from "./Pages/Cart";
import CartDetails from "./Pages/CartDetails";
import Login from "./Pages/login/Login";
import NewProduct from "./Pages/login/NewProduct";
import Checkout from "./Pages/Checkout";
import NewSignals from "./Pages/login/NewSignals";
import UpdateProducts from "./Pages/login/UpdateProducts";
import Auth from "./Pages/Log";
import Signup from "./Pages/Signup";
import Log from "./Pages/Log";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authSlice } from "./redux/AuthSlice";
import ForgetPassword from "./Pages/ForgetPassword";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const id = useSelector((state) => state.auth.id);

  // console.log(isLoggedIn, id);

  const { logIn, logOut } = authSlice.actions;
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("Account"));
    const id = JSON.parse(localStorage.getItem("Account"));
    const accountId = JSON.parse(localStorage.getItem("Account"));

    // console.log("loggedInuser", loggedInUser);
    if (loggedInUser && loggedInUser.loggedIn) {
      dispatch(logIn(loggedInUser));
    }
  }, []);

  return (
    <div className=" md:overflow-hidden ">
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
        {/* <Route index element={<Checkout />} /> */}
        <Route path="/growing-small-account" element={<GrowingAccount />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="description/:id" element={<CartDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newproduct" element={<NewProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/newsignals" element={<NewSignals />} />

        <Route path="/forgetpassword" element={<ForgetPassword />} />
        {/* {!isLoggedIn ? (
          
        ) : (
          <Route path="/" element={<Home/>} />
        )} */}
        <Route path="/log" element={<Log />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="*" element={<PageNotFound/>} /> */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

// "dependencies": {
//   "cssnano": "^5.0.6",
//   "jest-worker": "^27.0.2",
//   "postcss": "^8.3.5",
//   "schema-utils": "^4.0.0",
//   "serialize-javascript": "^6.0.0",
//   "source-map": "^0.6.1"
// },
