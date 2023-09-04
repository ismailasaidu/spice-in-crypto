import React from "react";
import slack from "../Assets/slack.png";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc  } from "firebase/firestore";
import { db } from "../lib/init-firebase";
import { useSelector, useDispatch} from "react-redux";
import { add } from "../redux/CartSlice";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";




const SignalPrice = ({ item, itemIndex }) => {
 
  const userId = useSelector(state => state.auth.id);

  const [paidCourses, setPaidCourses] = useState([]); 

  const retrievePaidCourses = async () => {
    const userRef = doc(db, "Accounts", userId);
    const res = await getDoc(userRef);
    const {userPaidCourse} = await res.data()

    setPaidCourses(userPaidCourse)
  }
  
  useEffect(() => {
      retrievePaidCourses()
  }, []);

  // const { id } = item.id;
  const dispatch = useDispatch();
  
  // console.log('paid Courses', paidCourses)
  function Send(e) {
    e.preventDefault();
    dispatch(add(item));
  }

  const logs = localStorage.getItem("Account");
 
  // console.log(loginIn.data.Password);

  //  const [info, setinfo] = useState("")
  //  console.log(info)


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

  return (
    <div>
      <div className="flex flex-row sm:flex-col md:gap-[30px]    justify-between  md:px-0 ">
        <div className="flex sm:flex-col gap-[30px] sm:gap-[50px] flex-col">
          <div0
            id="box"
            className=" hover:text-lightblue bg-white flex text-textcolor justify-center gap-[10px] items-center sm:h-[250px] flex-col shadow-xl rounded-xl p-[30px]">
            <h1 className="sm:text-[20px] text-center">
              {item.data.Description}
            </h1>
            <h1 className="font-bold sm:text-[20px]  text-[24px]">
              {item.data.Price}
            </h1>
            <h1 className="text-[13px] sm:text-[20px] 0hover:text-textcolor">
              {item.data.Duration}
            </h1>
          </div0>

          <div className="text-center">
            <button
              className="bg-lightblue w-[130px] sm:w-[140px] sm:h-[50px] h-[40px] rounded-2xl text-[14px] sm:text-[14px] font-bold"
              onClick={Send}>
                {paidCourses.includes(item.id)? "UNLOCKED":"BUY NOW"}
              </button>
          </div>

          <div
            id="box"
            className="bg-white flex flex-col justify-between sm:gap-0 h-contain  text-center  shadow-2xl w-[272px] sm:w-[100%] text-[16px] font-bold text-textcolor sm:h-[500px] rounded-xl py-[55px] sm:py-[40px] pt-[-30px] ">
            <div></div>
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
    </div>
  );
};

export default SignalPrice;
