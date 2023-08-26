import React from "react";
import { BsPlayFill } from "react-icons/bs";
// import { Store } from "../component/product";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/init-firebase";
import { Link } from "react-router-dom";

const Started = () => {
  const [Ebooks, setEbooks] = useState([]);
  // const [skeleton, setSkeleton] = useState(true);

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
      .catch((error) => console.log(error.message));
  }

  return (
    <div className="">
      {
        Ebooks.map((item, index)=>(
          <Link to={`description/${index}`}>
          <div
            className="flex justify-center mt-[30px] sm:mt-[100px]  "
            data-aos="fade-up">
            <button className="flex justify-between bg-blue sm:bg-lightblue sm:px-[40px] rounded-2xl w-[170px] sm:w-[40%] sm:h-[60px] h-[40px] items-center  px-[20px] text-[15px] text-bold">
              <BsPlayFill className="sm:w-[30px] sm:h-[30px]" />
              <p className="text-black font-semibold sm:text-[24px] sm:font-bold">
                GET STARTED
              </p>
            </button>
          </div>
          </Link>
        ))
      }
     
      
    </div>
  );
};

export default Started;
