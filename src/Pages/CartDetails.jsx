import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../lib/init-firebase";

// import down from "../Assets/down.png";
import email from "../Assets/email.png";
// import up from "../Assets/up.png";

import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";

import { AiFillFacebook, AiFillTwitterSquare } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { GrInstagram } from "react-icons/gr";
import phone from "../Assets/phone.png";

const CartDetails = () => {
  const auth = useSelector((state) => state.auth);
  // console.log("auth", auth);
  const userId = useSelector((state) => state.auth.id);
  const accountId = useSelector((state) => state.auth.accountId);
  // console.log('acctId:' , accountId);
  const [paidCourses, setPaidCourses] = useState([]);
  const [Ebooks, setEbooks] = useState([]);
  const navigate = useNavigate();

  const retrievePaidCourses = async () => {
    // console.log("Account Id", accountId, "userId:", userId);
    const userRef = doc(db, "Accounts", accountId);
    const res = await getDoc(userRef);
    const data = res.data();
    // console.log("my matter", data);
    localStorage.setItem(data, "data");
    const { userPaidCourse } = res.data();
    // console.log("paidCourses", userPaidCourse);
    setPaidCourses(userPaidCourse);
  };

  useEffect(() => {
    if (accountId) retrievePaidCourses();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    getEbooks();
  }, []);
  // console.log("The ebooks",Ebooks);
  // console.log("Account Id", accountId, "userId:", userId);
  const sizes = [
    {
      size: "Small",
      value: "S",
    },
    { size: "Medium", value: "M" },
    { size: "L", value: "L" },
    { size: "XL", value: "XL" },
  ];

  const getEbooks = async () => {
    try {
      const Ebook = collection(db, "Ebooks");
      const response = await getDocs(Ebook);
      const ebook = response.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      setEbooks(ebook);
      // console.log("Boss I ran")
    } catch (err) {
      toast.error(err.message);
    }
  };
  // .then((response) => {
  //   const ebook = response.docs.map((doc) => ({
  //     data: doc.data(),
  //     id: doc.id,
  //   }));
  //   setEbooks(ebook);
  //   console.log("Boss I ran")
  // })

  // .catch((error) => toast.error(error.message));

  const { id } = useParams();

  const dispatch = useDispatch();

  function Send(e) {
    e.preventDefault();
    dispatch(add(Ebooks[id]));
  }

  const [show, setshow] = useState(false);
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
      <div
        style={{ opacity: show ? "0.6" : "" }}
        className="pt-[50px] sm:pt-[100px] md:pt-[50px] px-[100px] sm:px-[20px] md:px-[50px]">
        <div className="px-14 sm:px-[20px]">
          <div className="flex mt-[100px] sm:flex-col   md:justify-between">
            <div className="flex-1 md:pt-[80px] sm:mt-[-100px] relative">
              <img
                src={phone}
                alt=""
                className="w-[490px] h-[500px]  object-cover sm:h-[300px] sm:w-[400px] md:w-[500px] md:h-[370px]"
              />
              {/* <div className=" absolute top-[20px] left-[20px] text-white bg-secondary rounded-full w-[50px] h-[50px] sm:w-[40px] sm:h-[40px] md:top-[110px] md:w-[40px] md:h-[40px] sm:top-[100px]">
              <h1 className="pt-[14px] pl-[7px] font-black font-display text-[15px] sm:pt-[10px] md:pt-[8px] sm:text-[14px] sm:pl-[4px]">
                -{products[id]?.data.Discount}%
              </h1>
            </div> */}
            </div>
            <div className="flex flex-1 gap-[10px] flex-col sm:mt-[20px] sm:gap-[20px] md:gap-[10px]">
              <div>
                <h1 className="  tracking-wide">
                  <span className="text-grey ">
                    Home /Membership & E-book / Spice In Crypto Academy{" "}
                  </span>
                </h1>
              </div>
              <div>
                <h1 className="text-lightblue  text-[16px]">
                  Membership & E-book
                </h1>
              </div>
              <div>
                <h1 className="capitalize text-[24px] text-black md:text-[22px] sm:text-[22px]">
                  {Ebooks[id]?.data?.Description}
                </h1>
              </div>

              <div className="flex gap-[10px]">
                <h1 className="text-[20px] text-textcolor">
                  ₦{Ebooks[id]?.data?.Price}.00
                </h1>
              </div>
              {/* <div>
              <p className="text-grey font-display ">
                {Ebooks[id]?.data?.Title}
              </p>
            </div> */}

              <div>
                <button
                  className="bg-blue w-[150px] h-[50px] text-white "
                  onClick={Send}>
                  {paidCourses.includes(Ebooks[id]?.id)
                    ? "UNLOCKED"
                    : "BUY NOW"}
                </button>
              </div>
              {/* <div className=" sm:mt-[20px]">
              <p className="text-[14px]">
                Category{" "}
                <span className="text-grey"> :Women, Polo, Casual</span>
              </p>
              <p className="text-[14px]">
                Tags <span className="text-grey"> :Modern, Design, Cotton</span>
              </p>
            </div> */}
              {/* <div className="flex gap-[30px] mt-[20px] text-icn">
              <h1>
                <AiFillTwitterSquare className="w-[20px]  h-[25px]" />
              </h1>
              <h1>
                <AiFillFacebook className="w-[20px] h-[25px]" />
              </h1>

              <h1>
                <MdEmail className="w-[20px] h-[25px]" />
              </h1>

              <h1>
                <GrInstagram className="w-[20px] h-[25px]" />
              </h1>
            </div> */}
            </div>
          </div>
        </div>
        <div className="mt-[100px]  ">
          <div className="flex  mx-14 sm:mx-[20px] ">
            {/* <div className="border-divider  sm:flex-[1px] border h-[50px] cursor-pointer text-grey   sm:w-[100px] py-[15px] px-[10px]  ">
              <h1>Description</h1>
            </div> */}
            {/* <div className="border-divider  sm:flex-[1px] border h-[50px] cursor-pointer text-grey  py-[15px] px-[10px]  ">
            <h1>Review(0)</h1>
          </div> */}
          </div>
          {/* <div className="mx-14 sm:mx-[20px]">
            <p className="border-divider border   h-[250px] text-grey sm:overflow-scroll py-[15px] px-[30px] md:overflow-scroll">
              A key objective is engaging digital marketing customers and
              allowing them to interact with the brand through servicing and
              delivery of digital media. Information is<br></br> easy to access
              at a fast rate through the use of digital communications.{" "}
              <br></br>
              <br></br>
              Users with access to the Internet can use many digital mediums,
              such as Facebook, YouTube, Forums, and Email etc. Through Digital
              communications it creates a<br></br>
              Multi-communication channel where information can be quickly
              exchanged around the world by anyone without any regard to whom
              they are.[28] Social segregation plays no part through social
              <br></br> mediums due to lack of face to face communication and
              information being wide spread instead to a selective audience.
            </p>
          </div> */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CartDetails;
