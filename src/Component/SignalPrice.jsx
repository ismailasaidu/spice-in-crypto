import React from "react";
import slack from "../Assets/slack.png";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/init-firebase";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../redux/CartSlice";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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
];

const cardDetails = [
  {
    title: "BASIC FXB SIGNALS",
    price: "$30.00",
    duration: "/ Month",
  },
  {
    title: "STANDARD FXB SIGNALS",
    price: "$30.00",
    duration: "/ 3 Month",
  },
  {
    title: "PREMIUM FXB SIGNALS",
    price: "$30.00",
    duration: "/ 6 Month",
  },
];



const SignalPrice = ({ item }) => {
  useEffect(() => {
    console.log(item);
  }, []);

  const { id } = useParams();
  const dispatch = useDispatch();

  function Send(e) {
    e.preventDefault();
    dispatch(add(item));
  }

  const paymentStatus = localStorage.getItem('paymentStatus');

 const loginInfo = localStorage.getItem("Account")
 console.log(loginInfo.data.Email)



  const rating = [
    {
      imgSrc: "/.png",
    },
    {
      imgSrc: "/ratings.png",
    },
    {
      imgSrc: "/ratings.png",
    },
    {
      imgSrc: "/ratings.png",
    },
    {
      imgSrc: "/ratings.png",
    },
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();

   
  
    const PurchaseDetails = collection(db, "Purchase");
    const res = await getDocs(PurchaseDetails);
    const purchases = await res.docs.map(doc => ({
      data: doc.data(),
      
      id: doc.id,
    }))
    
    const userWithAccount = purchases.find(item => item.data.Email  && item.data.Password )
    console.log(userWithAccount)
 
  }
  return (


    <>
      <div className="flex flex-row sm:flex-col md:gap-[30px]    justify-between  md:px-0 ">
        <div className="flex sm:flex-col gap-[30px] sm:gap-[50px] flex-col">
          <div
            id="box"
            className=" hover:text-lightblue bg-white flex text-textcolor justify-center gap-[10px] items-center sm:h-[250px] flex-col shadow-xl rounded-xl p-[30px]">
            <h1 className="sm:text-[20px] text-center">{item.data.Description}</h1>
            <h1 className="font-bold sm:text-[20px]  text-[24px]">
              {item.data.Price}
            </h1>
            <h1 className="text-[13px] sm:text-[20px] hover:text-textcolor">
              {item.data.Duration}
            </h1>
          </div>
          
          <div className="text-center">
     
            <button
              className="bg-lightblue w-[130px] sm:w-[140px] sm:h-[50px] h-[40px] rounded-2xl text-[14px] sm:text-[14px] font-bold"
              onClick={Send}>
             

              {paymentStatus === 'success' ? (
        <button>UNLOCKED</button>
      ) : (
        <button> BUY NOW</button>
      )}
            </button>
            
          </div>
        
          <div
            id="box"
            className="bg-white flex flex-col justify-between sm:gap-0 h-contain  text-center  shadow-2xl w-[272px] sm:w-[100%] text-[16px] font-bold text-textcolor sm:h-[500px] rounded-xl py-[55px] sm:py-[40px] pt-[-30px] ">
              <div>
                
              </div>
            <div className="flex items-start gap-[10px] border-b border-footer p-[20px] sm:p-[10px]">
              <div className="">
                <p> ✅</p>
              </div>
              <div className="">
                <p className="sm:text-center sm:text-[14px]">
                  Daily signals on a variety of currency pairs
                </p>
              </div>
            </div>

            <div className=" flex items-center gap-[10px] justify-center  border-b h-[80px] border-footer mx-[50px] py-[25px] px-[5px]">
              <p> ✅</p>
              <p className="sm:text-[14px]">85% Win-Rate</p>
            </div>
            <div className="flex items-start gap-[10px] justify-center border-b border-footer p-[20px]">
              <p className=""> ✅</p>
              <p className="sm:text-[14px]">
                Daily signals on a variety of currency pairs
              </p>
            </div>
            <div className=" flex items-center gap-[10px] justify-center  border-b h-[80px] border-footer mx-[50px] py-[25px] px-[5px]">
              <p> ✅</p>
              <p className="sm:text-[14px]">85% Win-Rate</p>
            </div>
          </div>
      
        </div>
      
      </div>
     
    </>
  );
};

export default SignalPrice;
