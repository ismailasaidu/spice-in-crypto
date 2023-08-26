import Header from "./Component/Header";
import {Routes, Route } from "react-router-dom"
import Home from "./Pages/Home";
import OurStory from "./Pages/OurStory";
import PhysicalClasses from "./Pages/PhysicalClasses";
import Resources from "./Pages/Resources";
import Signals from "./Pages/Signals";
import Footer from "./Component/Footer";
import ImageView from "./Component/ImageView";
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


// import "bootstrap/dist/css/bootstrap.min.css";



function App() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

 
  return (
    <div className=" sm:w-[100vw]  overflow-hidde ">
      <Header/>
      <div className="" >
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/ourstory" element={<OurStory/>}/>
        <Route path="/physicalclasses" element={<PhysicalClasses/>}/>
        <Route path="/resources" element={<Resources/>}/>
        <Route path="/signals" element={<Signals/>}/>
        <Route path="/trading-sessions" element={<TradingSessions/>}/>
        <Route path="/types" element={<Types/>}/>
        <Route path="/trend" element={<Trend/>}/>
        <Route path="/growing-small-account" element={<GrowingAccount/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="description/:id" element={<CartDetails/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/newproduct" element={<NewProduct/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/newsignals" element={<NewSignals/>}/>
  
      

      </Routes>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
