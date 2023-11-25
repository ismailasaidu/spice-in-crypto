import React from "react";
import Play from "./Play";
// import { Store } from "../component/product";
import { useState, useEffect } from "react";
import { db } from "../lib/init-firebase";
import { Link } from "react-router-dom";
import { BsPlayFill } from "react-icons/bs";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../redux/CartSlice";
import { toast } from "react-toastify";

const Started = ({ icon, text1, text2 }) => {
  const [Ebooks, setEbooks] = useState([]);
  // const [skeleton, setSkeleton] = useState(true);

  const iconMap = {
    BsPlayFill: <BsPlayFill />,

    // Add more icons as needed
  };

  useEffect(() => {
    getEbooks();
  }, []);

  useEffect(() => {
    // console.log(products)
  }, [Ebooks]);

  function getEbooks() {
    const EbooksRef = collection(db, "Ebooks");

    getDocs(EbooksRef)
      .then((response) => {
        const Ebook = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        // setSkeleton(false)
        setEbooks(Ebook);
      })
      .catch((error) => toast.error(error.message));
  }

  return (
    <div className="">
      {Ebooks.map((item, index) => (
        <div className="flex justify-center mt-[30px]  " data-aos="fade-up">
          {/* <Link to={`description/${index}`}> */}
          <Link to="/signals">
            <button className="flex justify-between items-center  hover:bg-black hover:text-white  text-black bg-lightblue sm:bg-lightblue   rounded-2xl w-[170px]  sm:h-[40px] h-[40px]  px-[20px] text-[15px] text-bold">
              <div className=" "> {iconMap[icon]}</div>

              <p className=" font-semibold sm:text-[14px] sm:font-bold">
                {text1}
              </p>
              <p className="font-semibold sm:text-[14px] sm:font-bold">
                {text2}
              </p>
            </button>
          </Link>
          {/* </Link> */}
        </div>
      ))}
    </div>
  );
};

export default Started;
